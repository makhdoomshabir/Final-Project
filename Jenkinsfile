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
                            kubectl apply -f nginx-service.yaml
                            kubectl apply -f config-map.yaml
                            kubectl apply -f mysql-db.yaml
                            kubectl apply -f backend.yaml
                            kubectl apply -f frontend.yaml
                            '''
                        }
                    } 
                }

            }
}