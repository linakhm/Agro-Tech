pipeline {
    agent any

    stages {
       
       stage('Maven Build') {
            steps {

                sh 'mvn clean install'
            }
        }

        stage('Docker Build frontend and backend images') {
            steps {
            script {
                // Build Docker images using Dockerfile
                withDockerRegistry(toolName: 'Docker', url: 'linakhm87/agro-tech-devops-2023') {
    // some block
}
                sh 'docker build -t agrotech-backend-image:latest -f ~/Agro-Tech/Dockerfile/Dockerfile'
                sh 'docker build -t agrotech-frontend-image:latest -f /Agro-Tech-Frontend/Agro-Tech-Angular/Dockerfile'
                   }
        }

        stage('Push images to Docker Hub') {
            steps {
                // Push Docker images to Docker Hub
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh "docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD"
                    sh 'docker push your-dockerhub-username/agrotech-backend-image:latest'
                    sh 'docker push your-dockerhub-username/agrotech-frontend-image:latest'
                }
            }
        }

        stage('Junit Test & Reporting') {
            steps {
                // Run JUnit tests and archive the test reports
                sh 'mvn test'
                junit '**/target/surefire-reports/*.xml'
            }
        }

        stage('Deploy application with Docker Compose') {
            steps {

                sh 'docker-compose up -d'
            }
            post {
                failure {

                    sh 'docker-compose down'
                    echo 'Docker compose failed'
                }
            }
        }
    }

    post {
        success {

            echo 'Pipeline completed successfully!'
        }
        failure {

            echo 'Pipeline failed!'
        }
    }
}

