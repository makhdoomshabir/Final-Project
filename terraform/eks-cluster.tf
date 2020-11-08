data "aws_eks_cluster" "cluster" {
  name = module.eks.cluster_id
}

data "aws_eks_cluster_auth" "cluster" {
  name = module.eks.cluster_id
}

provider "kubernetes" {
  host                   = data.aws_eks_cluster.cluster.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.cluster.certificate_authority.0.data)
  token                  = data.aws_eks_cluster_auth.cluster.token
  load_config_file       = false
  version                = "~> 1.9"
}

module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  cluster_name    = "sfia-three"
  cluster_version = "1.18"
  subnets         = ["subnet-0bff1f33f1b62dfe4", "subnet-0f3d20fd1c869589b"]
  vpc_id          = "vpc-01c0efe131e346574"

  # worker_groups = [
  #   {
  #     instance_type = "t2.micro"
  #     asg_max_size  = 3
  #     cluster_name  = module.eks.cluster_id
  #   }
  # ]

  node_groups = {
    public = {
      subnets          = ["subnet-0bff1f33f1b62dfe4"]
      desired_capacity = 1
      max_capacity     = 2
      min_capacity     = 1

      instance_type = "t2.small"
      k8s_labels = {
        Environment = "public"
      }

      tags = {
        Name = "node-1"
      }
    }
    # private = {
    #   subnets          = ["subnet-0f3d20fd1c869589b"]
    #   desired_capacity = 1
    #   max_capacity     = 2
    #   min_capacity     = 1

    #   instance_type = "t2.micro"
    #   k8s_labels = {
    #     Environment = "private"
    #   }
    # }
  }
}