pipeline {
    agent any

    stages {
       
       stage('Maven Build') {
            steps {

                sh 'mvn clean compile'
            }
        }
        
       stage('Run Junit Test & Reporting') {
            steps {
            
                sh 'mvn test -DskipTests'

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

            stage('Docker Build backend image') {

            steps {           
            script { 
            
            // Run the docker build command
           
   sh "docker build -t agrotech-backend-image:latest -f /var/lib/jenkins/workspace/Agro-Tech-DevOps/Dockerfile ."


}
    
        }
}
stage('Docker Build frontend image') {

            steps {           
            script { 
            
            // Run the docker build command
           

 sh 'docker build -t agrotech-frontend-image:latest -f /var/lib/jenkins/workspace/Agro-Tech-DevOps/Agro-Tech-Angular/Dockerfile /var/lib/jenkins/workspace/Agro-Tech-DevOps/Agro-Tech-Angular'    

}
    
        }
}

            stage('Docker push frontend and backend images') {
           
            steps{
            script { 
            
            withCredentials([string(credentialsId: 'docker_PAT', variable: 'docker_variable')]) {
    
                     sh 'docker login -u linakhm87 -p ${docker_variable}'

                     sh 'docker push linakhm87/agrotech-backend-image:latestimage'
}
                     sh 'docker push linakhm87/agrotech-frontend-image:latestimage' }
     
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
   
   
   
    
  
   
  

