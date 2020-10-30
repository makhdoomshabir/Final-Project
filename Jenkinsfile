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
                stage('Install Java and Maven on test server & Clone repo'){
                    steps{
                        withCredentials([file(credentialsId: 'test', variable: 'test')]){
                            sh '''
                            ssh -tt -o "StrictHostKeyChecking=no" -i ${test} ubuntu@10.0.2.152 << EOF
                            rm -rf Final-Project
                            git clone -b DevOps https://github.com/makhdoomshabir/Final-Project.git
                            cd Final-Project
                            sudo docker-compose up -d
                            sudo docker container ps
                            exit
                            EOF
                            '''
                        }
                    }
                }

                // stage('Steps for running tests'){
                //     steps{

                //     }
                // }
            }
}