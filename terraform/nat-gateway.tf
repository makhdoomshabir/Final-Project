# Create NAT Gateway
resource "aws_nat_gateway" "nat-gw" {
  allocation_id = aws_eip.nat_gw_eip.id
  subnet_id     = aws_subnet.subnet-4-prod.id
}

# Elastic IP for NAT Gateway
resource "aws_eip" "nat_gw_eip" {
  vpc = true
}