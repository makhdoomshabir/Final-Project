# # Create Jenkins EC2 instance. 
# resource "aws_instance" "Jenkins" {
#   ami                    = var.ami-id
#   instance_type          = var.instance-type
#   key_name               = "j-key"
#   vpc_security_group_ids = ["sg-07b8199a1b669f31e"]   #jenkins sg
#   subnet_id              = "subnet-07f5fa3c71d947b88" #jenkins subnet

#   tags = {
#     Name = "Jenkins Server"
#   }
# }

# # Create bastion box so I can SSH in and add public keys of adama and daood to grant them ssh access to other servers in VPC. 
# resource "aws_instance" "Bastion" {
#   ami                    = var.ami-id
#   instance_type          = var.instance-type
#   key_name               = "bastion"
#   vpc_security_group_ids = ["sg-0bfd706da27f396d0"]
#   subnet_id              = "subnet-0cda02ab4d3057b44"

#   tags = {
#     Name = "Bastion Server"
#   }
# }