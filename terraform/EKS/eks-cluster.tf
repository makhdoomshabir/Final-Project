data "aws_eks_cluster" "cluster" {
  name = my-cluster
}

data "aws_eks_cluster_auth" "cluster" {
  name = my-cluster
}

# resource "aws_eks_cluster" "my-cluster" {
#   name = "sfia-three-production"

#   vpc_config {
#     subnet_ids = [aws_subnet.subnet-4-prod, aws_subnet.subnet-5-spare]
#   }
# }

module "my-cluster" {
  source          = "terraform-aws-modules/eks/aws"
  cluster_name    = "sfia-three-production"
  cluster_version = "1.17"
  subnets         = ["subnet-0d34663f30d07b049", "subnet-03c7a3d49a96a3fcb"]
  vpc_id          = "vpc-0918b793f586c3feb"

  node_groups = {
    public = {
      subnets          = ["subnet-0d34663f30d07b049"]
      desired_capacity = 1
      max_capacity     = 1
      min_capacity     = 1
      instance_type    = "t2.micro"

    }

    private = {
      subnets          = ["subnet-03c7a3d49a96a3fcb"]
      desired_capacity = 1
      max_capacity     = 1
      min_capacity     = 1
      instance_type    = "t2.micro"
    }
  }
}