# Security group rule to allow bastion server to ssh into Jenkins server
resource "aws_security_group_rule" "bastion-to-jenkins-ssh" {
  type                     = "ingress"
  from_port                = 22
  to_port                  = 22
  protocol                 = "tcp"
  source_security_group_id = "sg-006fadfb34553a46e" #bastion sg
  security_group_id        = "sg-04c0d391fb6b827aa" #jenkins sg
}

resource "aws_security_group_rule" "bastion-to-jenkins-p8080" {
  type                     = "ingress"
  from_port                = 8080
  to_port                  = 8080
  protocol                 = "tcp"
  source_security_group_id = "sg-006fadfb34553a46e" #bastion sg
  security_group_id        = "sg-04c0d391fb6b827aa" #jenkins sg
}

resource "aws_security_group_rule" "bastion-to-jenkins-http" {
  type                     = "ingress"
  from_port                = 80
  to_port                  = 80
  protocol                 = "tcp"
  source_security_group_id = "sg-006fadfb34553a46e" #bastion sg
  security_group_id        = "sg-04c0d391fb6b827aa" #jenkins sg
}