variable "ami-id" {

  description = "AMI ID of ubuntu 18.04LTS eu-west-2"
  default     = "ami-09a1e275e350acf38"
}

variable "instance-type" {
  description = "Free tier EC2 Instance type"
  default     = "t2.micro"
}

variable "availability_zone" {
  description = "Default availability zone"
  default     = ["eu-west-2"]
}

# DB variables
variable "db-username" {
  default = "admin"
}

variable "db-password" {
  default = "password"
}
