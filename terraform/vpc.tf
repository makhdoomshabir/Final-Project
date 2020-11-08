# Create a vpc
resource "aws_vpc" "main-vpc" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name                               = "main-vpc"
    "kubernetes.io/cluster/sfia-three" = "shared"
  }
}