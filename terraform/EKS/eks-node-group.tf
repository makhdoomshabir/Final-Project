# resource "eks_node_group" "sfia-three-cluster" {
#   cluster_name    = module.my-cluster.cluster_id
#   node_group_name = "sfia-three-nodes"
#   subnet_ids      = ["subnet-0d34663f30d07b049"]

#   scaling_config {
#     desired_size = 1
#     min_size     = 1
#     max_size     = 1
#   }


#   ec2_ssh_key = "prod"

#   source_security_group_ids = ["sg-006fadfb34553a46e"]
# }