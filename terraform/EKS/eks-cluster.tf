data "aws_eks_cluster" "cluster" {
    namee = module.my-cluster.cluster_id
}

data "aws_eks_cluster_auth" "cluster" {
    name = module.my-cluster.cluster_id
}

module "my-cluster" {
    source = "terraform-aws-modules/eks/aws"
    cluster_name = "sfia-three-production"
    cluster_version = "1.14"
    subnets = ["subnet-0d34663f30d07b049", "subnet-0f06c99f91a7efdd4"]
    vpc_id = "vpc-0918b793f586c3feb"

    worker_groups = [
        {
            instance_type = "t2.micro"
            asg_max_size = 3
        }
    ]
}