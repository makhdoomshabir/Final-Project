# Create jenkins security group. Each IP will need an ingress rule of its own. (subnet 1)
resource "aws_security_group" "jenkins-sg" {
  name        = "jenkins-sg"
  description = "Jenkins server security group. Allows SSH & HTTP traffic and traffic through port 8080"
  vpc_id      = aws_vpc.main-vpc.id

  #Ingress/inbound rules

  #SSH Rules
  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] #Daood IP goes here. /32 CIDR notation for single IP
  }

  # HTTP Rules
  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] #Daood IP goes here. /32 CIDR notation for single IP
  }

  # Port 8080 Rules
  ingress {
    description = "port-8080"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] #Daood IP goes here. /32 CIDR notation for single IP
  }

  #Egress/Outbound rules
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

# Create test server security group. Each IP will need ingress rule of its own (subnet 2)
resource "aws_security_group" "test-sg" {
  name        = "test-sg"
  description = "Test server security group. Allows SSH and HTTP"
  vpc_id      = aws_vpc.main-vpc.id

  # Ingress/inbound rules

  # SSH Rules
  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] #Daood IP goes here. /32 CIDR notation for single IP
  }

  # HTTP Rules
  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] #Daood IP goes here. /32 CIDR notation for single IP
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

# Create security group for databases. Each IP will need ingress rule of its own (subnet 3)
resource "aws_security_group" "database-sg" {
  name        = "database-sg"
  description = "Database security group. Allows access from test and production subnets"
  vpc_id      = aws_vpc.main-vpc.id

  # Ingress/inbound rules

  # MySQL Rules
  ingress {
    description = "MySQL"
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] #Test & Prod subnet IP
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

# Create production server security group. (subnet 4)
resource "aws_security_group" "prod-sg" {
  name        = "prod-sg"
  description = "Allow web traffic from anywhere"
  vpc_id      = aws_vpc.main-vpc.id

  # Ingress/Inbound rules

  # SSH Rules
  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] #allow web traffic
  }

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

# Create bastion server security group (subnet 4)
resource "aws_security_group" "bastion-sg" {
  name        = "bastion-sg"
  description = "Allow web traffic from bastion server"
  vpc_id      = aws_vpc.main-vpc.id

  # Ingress/inbound rules

  # SSH Traffic
  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTP Traffic
  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Egress/Outbound rules
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "allow_access_bastion_server"
  }
}

# Create security group for cluster worker nodes
resource "aws_security_group" "cluster-sg" {
  name        = "cluster-sg"
  description = "Allow web traffic from anywhere"
  vpc_id      = aws_vpc.main-vpc.id

  # Ingress/Inbound rules

  # SSH Rules
  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] #change to specific IP
  }

  # # HTTP Rules
  # ingress {
  #   description = "HTTP"
  #   from_port   = 80
  #   to_port     = 80
  #   protocol    = "tcp"
  #   cidr_blocks = ["0.0.0.0/0"] #allow web traffic
  # }

  # # Egress/Outbound rules
  # egress {
  #   from_port   = 0
  #   to_port     = 0
  #   protocol    = "-1" # -1 means any protocol
  #   cidr_blocks = ["0.0.0.0/0"]
  # }

  tags = {
    Name = "allow_access_cluster"
  }
}