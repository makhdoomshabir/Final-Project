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
                    sh '''
                    rm -rf Final-Project
                    git clone https://github.com/makhdoomshabir/Final-Project.git
                    cd Final-Project
                    '''
              }
              }


            stage('Build FrontImage'){
                steps{
                    script{
                        dir("/SFIA2/frontend"){
                          if (env.rollback == 'false'){
                            frontendimage = docker.build("krystalsimmonds/sfia-three-react")
                        }
                      }
                    }
                }
            }

            stage('Tag & Push FrontImage'){
                steps{
                    script{
                        if (env.rollback == 'false'){
                            docker.withRegistry('https://registry.hub.docker.com', 'docker-credentials'){
                                frontendimage.push("${env.app_version}")
                            }
                        }
                    }
                }
            }

            stage('Build BackImage'){
                steps{
                    script{
                        dir("SFIA2/backend"){
                          if (env.rollback == 'false'){
                            backendimage = docker.build("krystalsimmonds/sfia-three-spring")
                        }
                      }
                    }
                }
            }

            stage('Tag & Push BackImages'){
                steps{
                    script{
                        if (env.rollback == 'false'){
                            docker.withRegistry('https://registry.hub.docker.com', 'docker-credentials'){
                                backendimage.push("${env.app_version}")
                            }
                        }
                    }
                }
            }

            stage('Build DatabaseImage'){
                steps{
                    script{
                        dir("SFIA2/database"){
                          if (env.rollback == 'false'){
                            databaseimage = docker.build("krystalsimmonds/mysql:5.7")
                        }
                      }
                    }
                }
            }

            stage('Tag & Push DatabaseImage'){
                steps{
                    script{
                        if (env.rollback == 'false'){
                            docker.withRegistry('https://registry.hub.docker.com', 'docker-credentials'){
                                databaseimage.push("${env.app_version}")
                            }
                        }
                    }
                }
            }

            stage('Deploy App'){
                steps{
                    sh '''
                    ssh ubuntu@10.0.2.114 <<EOF
                    sudo rm -rf Final-Project
                    git clone https://github.com/makhdoomshabir/Final-Project.git
                    cd Final-Project
                    docker pull krystalsimmonds/sfia-three-react:${env.app_version}
                    docker pull krystalsimmonds/sfia-three-spring:${env.app_version}
                    docker pull krystalsimmonds/mysql:5.7

                    docker-compose up -d
                    EOF
                    '''
                }
            }
            stage('Configure kubectl'){
                steps{
                    withAWS(credentials: 'aws-credentials', region: 'eu-west-2'){
                    sh '''
                    aws eks update-kubeconfig --name sfia-three
                    '''
                    }
                }
            }
            stage('Deploy with k8s'){
                steps{
                    withAWS(credentials: 'aws-credentials', region: 'eu-west-2'){
                        sh '''
                        rm -rf Final-Project
                        git clone -b DevOps https://github.com/makhdoomshabir/Final-Project.git
                        cd Final-Project/kubernetes
                        kubectl apply -f https://raw.githubusercontent.com/aws/amazon-vpc-cni-k8s/release-1.6/config/v1.6/calico.yaml
                        kubectl apply -f config-map.yaml
                        kubectl apply -f nginx-config.yaml
                        kubectl apply -f mysql-db.yaml
                        kubectl apply -f backend.yaml
                        kubectl apply -f frontend.yaml
                        '''
                    }
                }
            }
        }
}
