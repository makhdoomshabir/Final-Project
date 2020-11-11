# Final-Project
---
## Overview
The idea for this project is to design an application,
encompassing all the techniques and tools learnt throughout the academy.

The project must be built and design to host a `Help Queue` application,
where users will be able to log issues, entering a queue system. 
The project should include the following features;

### Basic Functionality
Create basic functionality for the application, including full CRUD.
Users will be ab   le to:

* Create new tickets and add them to the queue
* View tickets in the current queue from oldest to newest
* Delete existing tickets in the queue
* Update existing tickets in the queue

### Extra Functionality 

#### Solutions
When a ticket is being marked as "Done", 
users should be able to add a solution 
to that ticket, allowing other users to
see the solutions to a problem that has already been solved.

#### Cohorts
Implement a help queue per cohort, 
such that trainees can navigate to their 
cohort to see the help queue specific to their class.

A cohort page should display the trainers and trainees can make up that cohort.

#### Keyword Search
Implement a search bar feature, so that users can filter tickets based on keywords.

### Technologies

| Technology               | Constraint  |
| -----------              | ----------- |
| Kanban Board             | Jira        |
| Version Control          | Git|
| CI Server                | Jenkins |
| Configuration Management | Ansible |
| Cloud Server             | AWS EC2 |
| Database Server          | AWS RDS |
| Containerisation         | Docker  |
| Reverse Proxy            | NGINX  |
| Orchestration Tool       | Kubernetes  |
| Infrastructure Management| Terraform  |
| Programming language     | Java |
| Front-End                | React |
| Unit Tests               | JUnit and Mockito |
| Integration Test         | Selenium |

## Project Planning
---
### Risk Assessment 
A full risk assessment was carried out before commencing with project tasks. The whole assessment can be found at the following link:
https://docs.google.com/spreadsheets/d/1dbGavZvYB49_sulU9LrpJMsQJbQKQnIY7yc4-30rA4o/edit#gid=0

![risk-assessment](https://github.com/makhdoomshabir/Final-Project/blob/main/documentation/risk-assessment.png)

### Project Tracking
Jira was used to track the project progress. 5 Sprints were completed over the course of the project. Full details can be found at the following link:
https://ms9.atlassian.net/secure/RapidBoard.jspa?rapidView=6&projectKey=PT

![jira-screenshot](https://github.com/makhdoomshabir/Final-Project/blob/main/documentation/jira.png)


### User Experience

Below we describe the users experience when using the site, 
this is done in a flowchart diagram, where the user 
can access different pages in a structured environment.

#### Diagram
![userDiagram](documentation/UserExperience.png)

### Wireframes

#### HOME PAGE
![homePageDesign](https://github.com/makhdoomshabir/Final-Project/blob/DevOps/documentation/homepage.png)

#### ADD TICKET
![addTicketDesign](documentation/TicketAdd.png)

#### EDIT/ADD SOLUTION
![editAddSolution](documentation/issue.png)

### CI Pipeline
![ci_pipeline](https://github.com/makhdoomshabir/Final-Project/blob/main/documentation/ci_pipeline.png)

### AWS
#### Network Diagram
![aws_network_diagram](https://github.com/makhdoomshabir/Final-Project/blob/main/documentation/aws_net_diagram.png)

### MOSCOW Prioritisation

![moscow-prioritisation](https://github.com/makhdoomshabir/Final-Project/blob/main/documentation/Screenshot%20from%202020-10-14%2016-08-10.png)

### Entity Relationship Diagram
![erd](https://github.com/makhdoomshabir/Final-Project/blob/main/documentation/project_three_erd.png)

### Testing 
#### Backend: Java

#### Frontend: React
The frontend of the application was tested using Jest and the React-render-library. Snapshots were employed on all components to ensure code consistency post deployment. Unit testing was completed on key application fucntionality such as [insert list when done]. A view of the coverage report can be seen below:

![react-coverage](https://github.com/makhdoomshabir/Final-Project/blob/main/documentation/Snapshot%20Cov.png)


### Frontend Design 

![new-ticket](https://github.com/makhdoomshabir/Final-Project/blob/Frontend/documentation/newticketform.png)
![view-tickets](https://github.com/makhdoomshabir/Final-Project/blob/Frontend/documentation/viewtickets.png)
![home-page](https://github.com/makhdoomshabir/Final-Project/blob/Frontend/documentation/homepage.png)

### Authors
Adama Kabba

Daood Khan  

Krystal Simmonds

### Acknowledgements 
A special thank you to all the trainers that provided insight and guidance throughout this project including: Jay Grindrod, Savannah Vaithilingam and Jordan Harrison.
