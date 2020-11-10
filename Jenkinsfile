pipeline{
        agent any
        options {
          skipDefaultCheckout true
        }
        environment {
            app_version = 'v1'
            rollback = 'false'
        }

        stages{
            stage('Clone Repo'){
                steps{
                    dir("./home/jenkins"){
                    sh '''
                    rm -rf Final-Project
                    git clone https://github.com/makhdoomshabir/Final-Project.git
                    cd Final-Project
                    sudo docker-compose up -d
                    '''
                    }
                }
            }
            // stage('Build FrontImage'){
            //     steps{
            //         script{
            //             dir("/Final-Project/src/main/resources"){
            //               if (env.rollback == 'false'){
            //                 frontendimage = docker.build("krystalsimmonds/sfia-three-react")
            //             }
            //           }
            //         }
            //     }
            // }
            // stage('Tag & Push FrontImage'){
            //     steps{
            //         script{
            //             if (env.rollback == 'false'){
            //                 docker.withRegistry('https://registry.hub.docker.com', 'docker-credentials'){
            //                     frontendimage.push("${env.app_version}")
            //                 }
            //             }
            //         }
            //     }
            // }
            // stage('Build BackImage'){
            //     steps{
            //         script{
            //             dir("Final-Project/"){
            //               if (env.rollback == 'false'){
            //                 springimage = docker.build("krystalsimmonds/sfia-three-spring")
            //             }
            //           }
            //         }
            //     }
            // }
            // stage('Tag & Push BackImages'){
            //     steps{
            //         script{
            //             if (env.rollback == 'false'){
            //                 docker.withRegistry('https://registry.hub.docker.com', 'docker-credentials'){
            //                     springimage.push("${env.app_version}")
            //                 }
            //             }
            //         }
            //     }
            // }
            // stage('Deploy App'){
            //     steps{
            //         sh '''
            //         ssh ubuntu@10.0.2.114 <<EOF
            //         sudo rm -rf Final-Project
            //         git clone https://github.com/makhdoomshabir/Final-Project.git
            //         cd Final-Project
            //         docker pull krystalsimmonds/sfia-three-react:v1
            //         docker pull krystalsimmonds/sfia-three-spring:v1
            //         docker pull krystalsimmonds/mysql:5.7

            //         docker-compose up -d
            //         EOF
            //         '''
            //     }
            // }
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
