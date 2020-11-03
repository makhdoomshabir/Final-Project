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
                        dir('./home/jenkins/Final-Project/kubernetes'){
                            sh '''
                            kubectl apply -f mysql-db.yaml
                            kubectl apply -f backend.yaml
                            kubectl apply -f frontend.yaml
                            kubectl apply -f nginx-service.yaml
                            kubectl apply -f config-map.yaml
                            '''
                        }
                    } 
                }

            }
}