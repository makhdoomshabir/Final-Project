# Security group rules to allow bastion server access to Jenkins server
resource "aws_security_group_rule" "bastion-to-jenkins-ssh" {
  type                     = "ingress"
  from_port                = 22
  to_port                  = 22
  protocol                 = "tcp"
  source_security_group_id = "sg-0a772d6bcc4f5d846" #bastion sg
  security_group_id        = "sg-09ee96be54576478d" #jenkins sg
}

resource "aws_security_group_rule" "bastion-to-jenkins-p8080" {
  type                     = "ingress"
  from_port                = 8080
  to_port                  = 8080
  protocol                 = "tcp"
  source_security_group_id = "sg-0a772d6bcc4f5d846" #bastion sg
  security_group_id        = "sg-09ee96be54576478d" #jenkins sg
}

resource "aws_security_group_rule" "bastion-to-jenkins-http" {
  type                     = "ingress"
  from_port                = 80
  to_port                  = 80
  protocol                 = "tcp"
  source_security_group_id = "sg-0a772d6bcc4f5d846" #bastion sg
  security_group_id        = "sg-09ee96be54576478d" #jenkins sg
}

#Security group rules to allow bastion server access to Test server
resource "aws_security_group_rule" "bastion-to-test-ssh" {
  type                     = "ingress"
  from_port                = 22
  to_port                  = 22
  protocol                 = "tcp"
  source_security_group_id = "sg-0a772d6bcc4f5d846" #bastion sg
  security_group_id        = "sg-03ac5ab50375df549" #test sg
}

resource "aws_security_group_rule" "bastion-to-test-p8080" {
  type                     = "ingress"
  from_port                = 8080
  to_port                  = 8080
  protocol                 = "tcp"
  source_security_group_id = "sg-0a772d6bcc4f5d846" #bastion sg
  security_group_id        = "sg-03ac5ab50375df549" #test sg
}

resource "aws_security_group_rule" "bastion-to-test-http" {
  type                     = "ingress"
  from_port                = 80
  to_port                  = 80
  protocol                 = "tcp"
  source_security_group_id = "sg-0a772d6bcc4f5d846" #bastion sg
  security_group_id        = "sg-03ac5ab50375df549" #test sg
}

# Security group rule to allow bastion server access to cluster
resource "aws_security_group_rule" "bastion-to-cluster-ssh" {
  type                     = "ingress"
  from_port                = 22
  to_port                  = 22
  protocol                 = "tcp"
  source_security_group_id = "sg-0a772d6bcc4f5d846" #bastion sg
  security_group_id        = "sg-07a8a71bd29b9f352" #prod sg
}