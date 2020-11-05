# Create subnet 1 (Private - Jenkins Server)
resource "aws_subnet" "subnet-1-jenkins" {
  vpc_id            = aws_vpc.main-vpc.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "eu-west-2a"
  tags = {
    Name = "jenkins-subnet-private"
  }
}

# Create subnet 2 (Private - Test Server)
resource "aws_subnet" "subnet-2-test" {
  vpc_id            = aws_vpc.main-vpc.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "eu-west-2a"
  tags = {
    Name = "test-subnet-private"
  }
}

# Create subnet 3 (Private - Databases)
resource "aws_subnet" "subnet-3-db" {
  vpc_id            = aws_vpc.main-vpc.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = "eu-west-2a"
  tags = {
    Name = "db-subnet-private"
  }
}

# Create subnet 4 (Public - Production Cluster)
resource "aws_subnet" "subnet-4-prod" {
  vpc_id            = aws_vpc.main-vpc.id
  cidr_block        = "10.0.4.0/24"
  availability_zone = "eu-west-2a"
  tags = {
    Name = "prod-subnet-public"
  }
}

# Create extra subnet in different availability zone (Private)
resource "aws_subnet" "subnet-5-spare" {
  vpc_id            = aws_vpc.main-vpc.id
  cidr_block        = "10.0.5.0/24"
  availability_zone = "eu-west-2b"
  tags = {
    Name = "spare-subnet-private"
  }
}

# Create DB Subnet group for Prod DB
resource "aws_db_subnet_group" "db-subnet-group" {
  name       = "db-subnet-group"
  subnet_ids = [aws_subnet.subnet-3-db.id, aws_subnet.subnet-5-spare.id]

  tags = {
    Name = "DB Subnet group"
  }
}