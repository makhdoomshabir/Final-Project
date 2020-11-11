pipeline{
        agent any
        options {
          skipDefaultCheckout true
        }
        environment {
            app_version = 'v2'
            rollback = 'false'
        }

        stages{
            stage('Clone Repo'){
                steps{
                    script{
                        if (env.rollback == 'false'){
                            sh """
                            rm -rf Final-Project
                            git clone https://github.com/makhdoomshabir/Final-Project.git
                            cd Final-Project

                            sudo docker-compose build
                            """

                        }
                    }
                }
            }
            stage('Tag & Push Images'){
                steps{
                    script{
                        if (env.rollback == 'false'){
                            docker.withRegistry('https://registry.hub.docker.com', 'docker-credentials'){
                                sh"""
                                docker push krystalsimmonds/frontend:${env.app_version}
                                docker push krystalsimmonds/backend:${env.app_version}
                                """
                            }
                        }
                    }
                }
            }
            stage('Deploy App'){
                steps{
                    sh """
                    ssh ubuntu@10.0.2.114 <<EOF
                    sudo rm -rf Final-Project
                    git clone https://github.com/makhdoomshabir/Final-Project.git
                    cd Final-Project
                    docker pull krystalsimmonds/sfia-three-react:${env.app_version}
                    docker pull krystalsimmonds/sfia-three-spring:${env.app_version}
                    docker pull krystalsimmonds/mysql:5.7

                    docker-compose up -d
                    EOF
                    """
                }
            }
            stage('Configure kubectl'){
                steps{
                    withAWS(credentials: 'aws-credentials', region: 'eu-west-2'){
                    sh """
                    aws eks update-kubeconfig --name sfia-three
                    """
                    }
                }
            }
            stage('Deploy with k8s'){
                steps{
                    withAWS(credentials: 'aws-credentials', region: 'eu-west-2'){
                        sh """
                        rm -rf Final-Project
                        git clone -b DevOps https://github.com/makhdoomshabir/Final-Project.git
                        cd Final-Project/kubernetes
                        kubectl apply -f https://raw.githubusercontent.com/aws/amazon-vpc-cni-k8s/release-1.6/config/v1.6/calico.yaml
                        kubectl apply -f config-map.yaml
                        kubectl apply -f nginx-config.yaml
                        kubectl apply -f mysql-db.yaml
                        kubectl apply -f backend.yaml
                        kubectl apply -f frontend.yaml
                        """
                    }
                }
            }
        }
}
