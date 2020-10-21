provider "aws" {
  version = "~> 2.0"
  region  = "eu-west-2"
  profile = "myprofile"
}


# Create a vpc
resource "aws_vpc" "main-vpc" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "main-vpc"
  }
}

# Elastic IP for NAT Gateway
resource "aws_eip" "nat_gw_eip" {
  vpc = true
}

# NAT Gateway
resource "aws_nat_gateway" "nat-gw" {
  allocation_id = aws_eip.nat_gw_eip.id
  subnet_id     = aws_subnet.subnet-4-prod.id
}

# Create internet gateway
resource "aws_internet_gateway" "main-gateway" {
  vpc_id = aws_vpc.main-vpc.id

  tags = {
    Name = "main"
  }
}

# Create route table for private subnet
resource "aws_route_table" "private-route-table" {
  vpc_id = aws_vpc.main-vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat-gw.id
  }

  tags = {
    Name = "private-route-table"
  }

}

# Create route table for public subnet
resource "aws_route_table" "public-route-table" {
  vpc_id = aws_vpc.main-vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main-gateway.id
  }

  tags = {
    Name = "public-route-table"
  }
}

# Create subnet 1
resource "aws_subnet" "subnet-1-jenkins" {
  vpc_id            = aws_vpc.main-vpc.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "eu-west-2a"
  tags = {
    Name = "jenkins-subnet-private"
  }
}

# Create subnet 2
resource "aws_subnet" "subnet-2-test" {
  vpc_id            = aws_vpc.main-vpc.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "eu-west-2a"
  tags = {
    Name = "test-subnet-private"
  }
}

# Create subnet 3
resource "aws_subnet" "subnet-3-db" {
  vpc_id            = aws_vpc.main-vpc.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = "eu-west-2a"
  tags = {
    Name = "db-subnet-private"
  }
}

# Create subnet 4
resource "aws_subnet" "subnet-4-prod" {
  vpc_id            = aws_vpc.main-vpc.id
  cidr_block        = "10.0.4.0/24"
  availability_zone = "eu-west-2a"
  tags = {
    Name = "prod-subnet-public"
  }
}

# Associate subnet 1 with private route table
resource "aws_route_table_association" "subnet-1-jenkins" {
  subnet_id      = aws_subnet.subnet-1-jenkins.id
  route_table_id = aws_route_table.private-route-table.id
}

# Associate subnet 2 with private route table
resource "aws_route_table_association" "subnet-2-test" {
  subnet_id      = aws_subnet.subnet-2-test.id
  route_table_id = aws_route_table.private-route-table.id
}

# Associate subnet 3 with private route table
resource "aws_route_table_association" "subnet-3-db" {
  subnet_id      = aws_subnet.subnet-3-db.id
  route_table_id = aws_route_table.private-route-table.id
}

# Associate subnet 4 with public route table
resource "aws_route_table_association" "subnet-4-prod" {
  subnet_id      = aws_subnet.subnet-4-prod.id
  route_table_id = aws_route_table.public-route-table.id
}

# Create jenkins security group. Each IP will need an ingress rule of its own. (subnet 1)
resource "aws_security_group" "jenkins-sg" {
  name        = "jenkins-sg"
  description = "Allow SSH, HTTP traffic and traffic through port 8080 for specific IPs of development team"
  vpc_id      = aws_vpc.main-vpc.id

  # Ingress/inbound rules

  # SSH Rules
  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/32"] #Daood IP goes here. /32 CIDR notation for single IP
  }

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/32"] #Adama IP goes here. /32 CIDR notation for single IP
  }

  # HTTP Rules
  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/32"] #Daood IP goes here. /32 CIDR notation for single IP
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/32"] #Adama IP goes here. /32 CIDR notation for single IP
  }

  # Port 8080 Rules
  ingress {
    description = "port-8080"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/32"] #Daood IP goes here. /32 CIDR notation for single IP
  }

  ingress {
    description = "port-8080"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/32"] #Adama IP goes here. /32 CIDR notation for single IP
  }

  # Egress/Outbound rules

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1" # -1 means any protocol
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "allow_access_jenkins_server"
  }
}

# Create test server security group (subnet 2)
resource "aws_security_group" "test-sg" {
  name        = "test-sg"
  description = "Allow SSH and HTTP traffic for specific IPs of development team"
  vpc_id      = aws_vpc.main-vpc.id

  # Ingress/inbound rules

  # SSH Rules
  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/32"] #Daood IP goes here. /32 CIDR notation for single IP
  }

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/32"] #Adama IP goes here. /32 CIDR notation for single IP
  }

  # HTTP Rules
  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/32"] #Daood IP goes here. /32 CIDR notation for single IP
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/32"] #Adama IP goes here. /32 CIDR notation for single IP
  }

  # Egress/Outbound rules

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1" # -1 means any protocol
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "allow_access_test_server"
  }
}

# Create prod server security group (subnet 4)
resource "aws_security_group" "prod-sg" {
  name        = "prod-sg"
  description = "Allow web traffic from anywhere"
  vpc_id      = aws_vpc.main-vpc.id

  # HTTP Rules
  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] #allow web traffic
  }

  # Egress/Outbound rules

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1" # -1 means any protocol
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "allow_access_prod_server"
  }
}

# Create security group for databases. (subnet 3)
resource "aws_security_group" "database-sg" {
  name        = "database-sg"
  description = "Allow access from test and production subnets"
  vpc_id      = aws_vpc.main-vpc.id

  # Ingress/inbound rules

  # SSH Rules
  ingress {
    description = "MySQL"
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/32"] #Test & Prod subnet IP
  }

  # Egress/Outbound rules

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1" # -1 means any protocol
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "allow_access_db_subnet"
  }
}

# Create NACL for private subnet with Test server
resource "aws_network_acl" "private_nacl_test" {
  vpc_id     = aws_vpc.main-vpc.id
  subnet_ids = [aws_subnet.subnet-2-test.id]

  # Allow inbound traffic SSH traffic
  ingress {
    protocol   = "tcp"
    rule_no    = 200
    action     = "allow"
    cidr_block = "0.0.0.0/32" #Daood IP
    from_port  = 22
    to_port    = 22
  }

  ingress {
    protocol   = "tcp"
    rule_no    = 200
    action     = "allow"
    cidr_block = "0.0.0.0/32" #Adama IP
    from_port  = 22
    to_port    = 22
  }

  # Allow outbound SSH traffic
  egress {
    protocol   = "tcp"
    rule_no    = 200
    action     = "allow"
    cidr_block = "0.0.0.0/32" #Adama IP
    from_port  = 22
    to_port    = 22
  }

  egress {
    protocol   = "tcp"
    rule_no    = 200
    action     = "allow"
    cidr_block = "0.0.0.0/32" #Daood IP
    from_port  = 22
    to_port    = 22
  }

  # Allow inbound HTTP traffic
  ingress {
    protocol   = "tcp"
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/32" #Daood IP
    from_port  = 80
    to_port    = 80
  }

  ingress {
    protocol   = "tcp"
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/32" #Adama IP
    from_port  = 80
    to_port    = 80
  }

  # Allow outbound HTTP traffic
  egress {
    protocol   = "tcp"
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/32" #Adama IP
    from_port  = 80
    to_port    = 80
  }

  egress {
    protocol   = "tcp"
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/32" #Daood IP
    from_port  = 80
    to_port    = 80
  }

  tags = {
    Name = "Test subnet NACL"
  }

}

# Create NACL for private subnet with Jenkins server
resource "aws_network_acl" "private_nacl_jenkins" {
  vpc_id     = aws_vpc.main-vpc.id
  subnet_ids = [aws_subnet.subnet-1-jenkins.id]

  # Allow inbound SSH traffic 
  ingress {
    protocol   = "tcp"
    rule_no    = 200
    action     = "allow"
    cidr_block = "0.0.0.0/32" #Daood IP
    from_port  = 22
    to_port    = 22
  }

  ingress {
    protocol   = "tcp"
    rule_no    = 200
    action     = "allow"
    cidr_block = "0.0.0.0/32" #Adama IP
    from_port  = 22
    to_port    = 22
  }

  # Allow outbound SSH traffic
  egress {
    protocol   = "tcp"
    rule_no    = 200
    action     = "allow"
    cidr_block = "0.0.0.0/32" #Adama IP
    from_port  = 22
    to_port    = 22
  }

  egress {
    protocol   = "tcp"
    rule_no    = 200
    action     = "allow"
    cidr_block = "0.0.0.0/32" #Daood IP
    from_port  = 22
    to_port    = 22
  }

  # Allow inbound HTTP traffic
  ingress {
    protocol   = "tcp"
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/32" #Daood IP
    from_port  = 80
    to_port    = 80
  }

  ingress {
    protocol   = "tcp"
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/32" #Adama IP
    from_port  = 80
    to_port    = 80
  }

  # Allow outbound HTTP traffic
  egress {
    protocol   = "tcp"
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/32" #Adama IP
    from_port  = 80
    to_port    = 80
  }

  egress {
    protocol   = "tcp"
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/32" #Daood IP
    from_port  = 80
    to_port    = 80
  }

  # Allow inbound traffic through port 8080
  ingress {
    protocol   = "tcp"
    rule_no    = 101
    action     = "allow"
    cidr_block = "0.0.0.0/32" #Daood IP
    from_port  = 8080
    to_port    = 8080
  }

  ingress {
    protocol   = "tcp"
    rule_no    = 101
    action     = "allow"
    cidr_block = "0.0.0.0/32" #Adama IP
    from_port  = 8080
    to_port    = 8080
  }

  # Allow outbound traffic through port 8080
  egress {
    protocol   = "tcp"
    rule_no    = 101
    action     = "allow"
    cidr_block = "0.0.0.0/32" #Daood IP
    from_port  = 8080
    to_port    = 8080
  }

  egress {
    protocol   = "tcp"
    rule_no    = 101
    action     = "allow"
    cidr_block = "0.0.0.0/32" #Adama IP
    from_port  = 8080
    to_port    = 8080
  }

  tags = {
    Name = "Jenkins subnet NACL"
  }

}

# Create NACL for private subnet with DB server
resource "aws_network_acl" "private_nacl_db" {
  vpc_id     = aws_vpc.main-vpc.id
  subnet_ids = [aws_subnet.subnet-3-db.id]

  # Allow inbound traffic through port 3306
  ingress {
    protocol   = "tcp"
    rule_no    = 103
    action     = "allow"
    cidr_block = "0.0.0.0/32" #Daood IP
    from_port  = 3306
    to_port    = 3306
  }

  ingress {
    protocol   = "tcp"
    rule_no    = 103
    action     = "allow"
    cidr_block = "0.0.0.0/32" #Adama IP
    from_port  = 3306
    to_port    = 3306
  }

  # Allow outbound traffic through port 3306
  egress {
    protocol   = "tcp"
    rule_no    = 103
    action     = "allow"
    cidr_block = "0.0.0.0/32" #Adama IP
    from_port  = 3306
    to_port    = 3306
  }

  egress {
    protocol   = "tcp"
    rule_no    = 103
    action     = "allow"
    cidr_block = "0.0.0.0/32" #Daood IP
    from_port  = 3306
    to_port    = 3306
  }

  tags = {
    Name = "DB subnet NACL"
  }

}

# Create NACL for public subnet with Prod server
resource "aws_network_acl" "public_nacl" {
  vpc_id     = aws_vpc.main-vpc.id
  subnet_ids = [aws_subnet.subnet-4-prod.id]

  # Allow inbound http traffic from internet
  ingress {
    protocol   = "tcp"
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/0"
    from_port  = 80
    to_port    = 80
  }

  # Allow outbound http traffic to internet
  egress {
    protocol   = "tcp"
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/0"
    from_port  = 80
    to_port    = 80
  }

  tags = {
    Name = "public NACL"
  }

}

# Create EC2 instance
# Commenting out the below to create VPC, subnets and internet gateway first so VPC and subnet IDs can be added to EC2 resource
#resource "aws_instance" "EC2" {
#  ami           = var.ami-id
#  instance_type = var.instance-type
#  key_name      = var.pem-key
#}
