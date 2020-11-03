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
                        withCredentials([file(credentialsId: 'prod', variable: 'prod')]){
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
                }

                stage('Configure kubectl'){
                    steps{
                        withAWS(credentials: 'aws-credentials', region: 'eu-west-2') {
                        sh '''
                        aws eks --region eu-west-2 update-kubeconfig --name sfia-three-production
                        '''
                        }
                    } 
                }

                stage('Deploy with k8s'){
                    steps{
                        dir('./home/ubuntu/Final-Project/kubernetes'){
                            sh '''
                            kubectl apply -f mysql-db.yaml
                            kubectl apply -f backend.yaml
                            kubectl apply -f frontend.yaml
                            kubectl apply -f nginx-service.yaml
                            kubectl apply -f backend.yaml
                            kubectl apply -f backend.yaml
                            '''
                        }
                    } 
                }

            }
}