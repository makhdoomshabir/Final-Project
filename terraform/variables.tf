variable "ami-id" {
 #AMI NEEDS CHANGING TO EU-WEST-2 
  description = "AMI ID of ubuntu 18.04LTS eu-west-2"
  default     = "ami-0823c236601fef765"
}

variable "instance-type" {
  description = "Free tier EC2 Instance type"
  default     = "t2.micro"
}

variable "pem-key" {
#PEM KEY MAY NEED CHANGING
  description = "Associated Key to SSH into the EC2 Instance"
  default     = "instance-1"
}
