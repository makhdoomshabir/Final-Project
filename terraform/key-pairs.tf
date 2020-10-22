# Key pair resource for jenkins server
resource "aws_key_pair" "jenkins" {
  key_name   = "j-key"
  public_key = file("~/.ssh/id_rsa.pub")
}

# Bastion box key pair
resource "aws_key_pair" "bastion" {
  key_name   = "bastion"
  public_key = file("~/.ssh/id_rsa.pub")
}