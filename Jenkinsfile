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
                            git clone https://github.com/makhdoomshabir/Final-Project.git
                            cd Final-Project
                            echo "Hello"
                            '''
                        }
                    }
                }
            }
}

//             stage('Build application using docker-compose'){
//                 steps{
//                     withCredentials([file(credentialsId: 'test', variable: 'test')]){
//                         sh '''
//                         ssh -tt -o "StrictHostKeyChecking=no" -i ${test} ubuntu@10.0.2.152 << EOF
//                         sudo apt-get update && sudo apt-get install -y git openjdk-8-jdk maven
//                         '''
//                     }
//                 }
//             }
        
//             stage('Build Frontend Image'){
//                 steps{      
//                     script{
//                         dir("/Final-Project/frontend"){
//                           if (env.rollback == 'false'){
//                             frontendimage = docker.build("krystalsimmonds/sfia-three-react")
//                         }
//                       }          
//                     }
//                 }          
//             }

//             stage('Tag & Push FrontImage'){
//                 steps{
//                     script{
//                         if (env.rollback == 'false'){
//                             docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials'){
//                                 frontendimage.push("${env.app_version}")    
//                             }
//                         }
//                     }
//                 }          
//             }                

//             stage('Build BackImage'){
//                 steps{      
//                     script{
//                         dir("SFIA2/backend"){
//                           if (env.rollback == 'false'){
//                             backendimage = docker.build("adamal5/sfia2-backend")
//                         }
//                       }          
//                     }
//                 }          
//             }   
                
//             stage('Tag & Push BackImages'){
//                 steps{
//                     script{
//                         if (env.rollback == 'false'){
//                             docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials'){
//                                 backendimage.push("${env.app_version}")  
//                             }
//                         }
//                     }
//                 }          
//             } 
 
//             stage('Build DatabaseImage'){
//                 steps{      
//                     script{
//                         dir("SFIA2/database"){
//                           if (env.rollback == 'false'){
//                             databaseimage = docker.build("adamal5/sfia2-database")
//                         }
//                       }          
//                     }
//                 }          
//             }                

//             stage('Tag & Push DatabaseImage'){
//                 steps{
//                     script{
//                         if (env.rollback == 'false'){
//                             docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials'){
//                                 databaseimage.push("${env.app_version}")    
//                             }
//                         }
//                     }
//                 }          
//             }

                                                     
//             stage('Deploy App'){
//                 steps{ 
//                     sh '''
//                     ssh ubuntu@ip-172-31-8-254 <<EOF
//                     sudo rm -rf SFIA2
//                     git clone https://github.com/adamal5/SFIA2
//                     cd SFIA2
//                     export DATABASE_URI=mysql+pymysql://admin:ab5gh78af@terraform-20201014184555657300000001.cdsmwkad1q7o.eu-west-2.rds.amazonaws.com:3306:3306/users
//                     export TEST_DATABASE_URI=mysql+pymysql://admin:ab5gh78hj@terraform-20201014184555658100000002.cdsmwkad1q7o.eu-west-2.rds.amazonaws.com:3306/test
//                     export SECTRET_KEY=hjbsdjbsd
//                     docker pull adamal5/sfia2-frontend:v1
//                     docker pull adamal5/sfia2-backend:v1
//                     docker pull adamal5/sfia2-database:v1
                    
//                     docker-compose up -d
// EOF
//                     '''
//                     }
                
//                 }   
                
//             stage('Run Frontend Test'){
//                 steps{
//                     sh '''
//                     ssh ubuntu@ip-172-31-8-254 -y <<EOF
//                     sleep 15
//                     cd SFIA2/frontend/tests
//                     docker-compose exec -T frontend pytest --cov application > frontend-test.txt
// EOF
//                     '''
//                     }
//                 }                 
//             stage('Run Backend Test'){
//                 steps{
//                     sh '''
//                     ssh ubuntu@ip-172-31-8-254 -y <<EOF
//                     cd SFIA2/frontend/tests
//                     docker-compose exec -T backend pytest --cov application > backend-test.txt

// EOF
//                     '''
//                     }
//                 }                 
//             }
// }