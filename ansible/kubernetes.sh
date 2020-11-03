# #Add the Cloud SDK distribution URI as a package source: 
# echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
# #Make sure you have apt-transport-https installed:
# sudo apt-get install apt-transport-https ca-certificates gnupg
# #Import the Google Cloud public key:
# curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
# #Update and install the Cloud SDK:
# sudo apt-get update && sudo apt-get install google-cloud-sdk
# #install kubernetes
# sudo apt-get install kubectl


# download
curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl"
# make executable 
sudo chmod +x kubectl
# install binary in to your PATH
sudo mv ./kubectl /usr/local/bin/kubectl
echo $(kubectl version --client) << EOF