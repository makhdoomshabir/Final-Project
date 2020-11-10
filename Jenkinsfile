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
                    rm -rf SFIA2
                    git clone https://github.com/adamal5/SFIA2
                    cd SFIA2
                    '''
                    }
                }
            }

            stage('Build FrontImage'){
                steps{
                    script{
                        dir("/Final-Project/frontend"){
                          if (env.rollback == 'false'){
                            frontendimage = docker.build("adamal5/sfia2-frontend")
                        }
                      }
                    }
                }
            }

                    stage('Tag & Push FrontImage'){
                        steps{
                            script{
                                if (env.rollback == 'false'){
                                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials'){
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
                                    backendimage = docker.build("krystalsimmonds/Final-Project-backend")
                                }
                              }
                            }
                        }
                    }

                    stage('Tag & Push BackImages'){
                        steps{
                            script{
                                if (env.rollback == 'false'){
                                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials'){
                                        backendimage.push("${env.app_version}")
                                    }
                                }
                            }
                        }
                    }

                    stage('Build DatabaseImage'){
                        steps{
                            script{
                                dir("Final-Project/database"){
                                  if (env.rollback == 'false'){
                                    databaseimage = docker.build("krystalsimmonds/Final-Project-database")
                                }
                              }
                            }
                        }
                    }

                    stage('Tag & Push DatabaseImage'){
                        steps{
                            script{
                                if (env.rollback == 'false'){
                                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials'){
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
                            sudo rm -rf SFIA2
                            git clone https://github.com/adamal5/SFIA2
                            cd SFIA2
                            export DATABASE_URI=mysql+pymysql://admin:ab5gh78af@terraform-20201014184555657300000001.cdsmwkad1q7o.eu-west-2.rds.amazonaws.com:3306:3306/users
                            export TEST_DATABASE_URI=mysql+pymysql://admin:ab5gh78hj@terraform-20201014184555658100000002.cdsmwkad1q7o.eu-west-2.rds.amazonaws.com:3306/test
                            export SECTRET_KEY=hjbsdjbsd
                            docker pull krystalsimmonds/Final-Project-frontend:v1
                            docker pull krystalsimmonds/Final-Project-backend:v1
                            docker pull krystalsimmonds/Final-Project-database:v1

                            docker-compose up -d
        EOF
                            '''
                            }

            stages{
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