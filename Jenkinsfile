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
                stage('Install kubectl'){
                    steps{
                        
                            sh '''
                            ssh -tt -o "StrictHostKeyChecking=no" -i ${prod} ubuntu@10.0.4.127 << EOF
                            curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl"
                            sudo chmod +x ./kubectl
                            sudo mv ./kubectl /usr/local/bin/kubectl
                            echo $(kubectl version --client) 
                            exit
                            EOF
                            '''
                        
                    }
                }

                stage
            }
}