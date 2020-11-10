# Elastic IP for NAT Gateway
resource "aws_eip" "nat_gw_eip" {
  vpc = true

  tags = {
    Name = "NAT GW IP"
  }
}

# Elastic IP for bastion server
resource "aws_eip" "bastion_eip" {
  instance = aws_instance.Bastion.id
  vpc      = true

  tags = {
    Name = "Bastion Instance IP"
  }
}

# EIP association for bastion server
resource "aws_eip_association" "eip_assoc" {
  instance_id   = aws_instance.Bastion.id
  allocation_id = aws_eip.bastion_eip.id
}