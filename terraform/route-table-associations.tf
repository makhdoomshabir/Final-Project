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