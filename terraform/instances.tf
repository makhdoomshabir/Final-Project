# Create Jenkins EC2 instance. 
resource "aws_instance" "Jenkins" {
  ami                    = var.ami-id
  instance_type          = var.instance-type
  key_name               = "j-key"
  vpc_security_group_ids = ["sg-04c0d391fb6b827aa"]   #jenkins sg
  subnet_id              = "subnet-01f8a9cc5ccba08d9" #jenkins subnet

  tags = {
    Name = "Jenkins Server"
  }
}

# Create bastion server so I can SSH in and add public keys of adama and daood to grant them ssh access to other servers in VPC. 
resource "aws_instance" "Bastion" {
  ami                    = var.ami-id
  instance_type          = var.instance-type
  key_name               = "bastion"
  vpc_security_group_ids = ["sg-006fadfb34553a46e"]   #bastion sg
  subnet_id              = "subnet-0d34663f30d07b049" #public subnet 

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
  vpc_security_group_ids = ["sg-00a049e5d7875387c"]   #test sg
  subnet_id              = "subnet-0603791b1ee37f9b3" #test subnet

  tags = {
    Name = "Test Server"
  }
}

# Create Prod EC2 instance
resource "aws_instance" "Prod" {
  ami                    = var.ami-id
  instance_type          = var.instance-type
  key_name               = "prod"
  vpc_security_group_ids = ["sg-0a3b9745c0d579e7b"]   #prod sg
  subnet_id              = "subnet-0d34663f30d07b049" #prod subnet

  tags = {
    Name = "Prod Server"
  }
}

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
  vpc_security_group_ids = ["sg-0573d0f4f2673129a"]
  db_subnet_group_name   = "db-subnet-group"
  identifier             = "prod-db"
}

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
  vpc_security_group_ids = ["sg-0573d0f4f2673129a"]
  db_subnet_group_name   = "db-subnet-group"
  identifier             = "test-db"
}