# Create Jenkins EC2 instance. 
resource "aws_instance" "Jenkins" {
  ami                    = var.ami-id
  instance_type          = var.instance-type
  key_name               = "j-key"
  vpc_security_group_ids = ["sg-09ee96be54576478d"]   #jenkins sg
  subnet_id              = "subnet-0a76c757ac8152b85" #jenkins subnet

  tags = {
    Name = "Jenkins Server"
  }
}

# Create bastion server so I can SSH in and add public keys of adama and daood to grant them ssh access to other servers in VPC. 
resource "aws_instance" "Bastion" {
  ami                    = var.ami-id
  instance_type          = var.instance-type
  key_name               = "bastion"
  vpc_security_group_ids = ["sg-0a772d6bcc4f5d846"]   #bastion sg
  subnet_id              = "subnet-0bff1f33f1b62dfe4" #public subnet 

  tags = {
    Name = "Bastion Server"
  }
}

# Create Test EC2 instance.
resource "aws_instance" "Test" {
  ami                    = var.ami-id
  instance_type          = var.instance-type
  availability_zone      = "eu-west-2a"
  key_name               = "test"
  vpc_security_group_ids = ["sg-03ac5ab50375df549"]   #test sg
  subnet_id              = "subnet-021844b1684c653df" #test subnet

  tags = {
    Name = "Test Server"
  }
}

# Create Prod RDS instance
resource "aws_db_instance" "prod" {
  allocated_storage      = 20
  storage_type           = "gp2"
  engine                 = "mysql"
  engine_version         = "5.7"
  instance_class         = "db.t2.micro"
  name                   = "app_db"
  username               = var.db-username
  password               = var.db-password
  skip_final_snapshot    = true
  vpc_security_group_ids = ["sg-08c5ccd86a646c7cc"] # DB security group
  db_subnet_group_name   = "db-subnet-group1"
  identifier             = "prod-db"
}

# Create Test RDS instance
resource "aws_db_instance" "test" {
  allocated_storage      = 20
  storage_type           = "gp2"
  engine                 = "mysql"
  engine_version         = "5.7"
  instance_class         = "db.t2.micro"
  name                   = "test_db"
  username               = var.db-username
  password               = var.db-password
  skip_final_snapshot    = true
  vpc_security_group_ids = ["sg-08c5ccd86a646c7cc"] # DB security group
  db_subnet_group_name   = "db-subnet-group1"
  identifier             = "test-db"
}