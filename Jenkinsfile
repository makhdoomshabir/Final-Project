pipeline{
        agent any
        stages{
            stage('Install Docker'){
                steps{
                    sh ''' 
                    curl https://get.docker.com | sudo bash
                    sudo usermod -aG docker $(whoami)
                    '''
                }
            }
                
            stage('Install Docker-Compose'){
                steps{
                    sh ''' 
                    sudo apt install -y curl jq
                    # set which version to download (latest)
                    version=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | jq -r '.tag_name')
                    # download to /usr/local/bin/docker-compose
                    sudo curl -L "https://github.com/docker/compose/releases/download/${version}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
                    # make the file executable
                    sudo chmod +x /usr/local/bin/docker-compose
                    '''
                }
            }  
            // stage('Spin up containers'){
            //     steps{
            //     withCredentials([file(credentialsId: 'TestServKeyPair', variable: 'TestServKeyPair'), string(credentialsId: 'DATABASE_URI', variable: 'DATABASE_URI'), string(credentialsId: 'TEST_DATABASE_URI', variable: 'TEST_DATABASE_URI'), string(credentialsId: 'MYSQL_ROOT_PASSWORD', variable: 'MYSQL_ROOT_PASSWORD'), string(credentialsId: 'DB_PASSWORD', variable: 'DB_PASSWORD')]){
            //         sh '''
            //         ssh -tt -o "StrictHostKeyChecking=no" -i ${TestServKeyPair} ubuntu@ec2-35-178-75-123.eu-west-2.compute.amazonaws.com << EOF
            //         export MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD} DATABASE_URI=${DATABASE_URI} DB_PASSWORD=${DB_PASSWORD} TEST_DATABASE_URI=${TEST_DATABASE_URI}
            //         git clone https://github.com/krystal-simmonds/SFIA_2.git
            //         cd SFIA_2
            //         sudo -E MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD} DATABASE_URI=${DATABASE_URI} DB_PASSWORD=${DB_PASSWORD} TEST_DATABASE_URI=${TEST_DATABASE_URI} docker-compose up -d
            //         EOF
            //         '''
            //     }
            //     }
            // }

            stage('Run tests'){
                steps{
                    sh '''
                    echo $(docker --version)
                    echo $(docker-compose --version)
                    '''
                    }
                }
        }    
}