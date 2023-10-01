pipeline {
    agent any

    stages {
       
       stage('Maven Build') {
            steps {

                sh 'mvn clean install'
            }
        }
        
       stage('Run Junit Test & Reporting') {
            steps {
            
                sh 'mvn test'
                junit '**/target/surefire-reports/*.xml'

        }
         
          }      
          
         stage('Archive the test reports') {
         
            steps {
            
                archiveArtifacts artifacts: 'target/*,jar', followSymlinks: false
                
            }
            
        }
        
         stage('SonarQube Analysis') {
         
            steps {
            
                script {
                    
                        // Use Jenkins credentials to securely access the SonarQube token
                  
                    withCredentials([string(credentialsId: 'sonar', variable: 'SONAR_TOKEN')]) {
                        // Run SonarQube analysis with authentication
                        
                        sh "mvn sonar:sonar -Dsonar.login=$SONAR_TOKEN"
                    }
                }
            }
}

            stage('Docker Build & Push frontend and backend images') {

            steps {
            
            script {
            
     // Use Jenkins credentials to securely access the Docker PAT
                    withCredentials([string(credentialsId: 'docker-pat', variable: 'DOCKER_PAT')]) {
                        // Define the Docker registry URL (e.g., Docker Hub)
                        def dockerRegistryUrl = 'https://index.docker.io/v1/'

  // Debugging output
                echo "DOCKER_PAT: $DOCKER_PAT"
                echo "Docker Registry URL: $dockerRegistryUrl"

                        // Log in to the Docker registry using the Docker PAT
                        sh "docker login -u _token -p $DOCKER_PAT $dockerRegistryUrl"

                        // Build and push your Docker images as before
                        sh 'docker build -t agrotech-backend-image:latest -f /root/Agro-Tech/Agro-Tech/Dockerfile .'
                        sh 'docker push linakhm87/agrotech-backend-image:latest'
                        sh 'docker build -t agrotech-frontend-image:latest -f /Agro-Tech-Frontend/Agro-Tech-Angular/Dockerfile .'
                        sh 'docker push linakhm87/agrotech-frontend-image:latest'
               
                 }
        }
}
}

        stage('Deploy application with Docker Compose') {
            steps {

                sh 'sudo docker-compose up -d'
                echo 'App successfully executed with Docker compose'
            }
            post {
                failure {

                    sh 'docker-compose down'
                    echo 'App failed to execute with Docker compose'
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
    
  
   
  

