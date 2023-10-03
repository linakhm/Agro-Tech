# Use a base image with OpenJDK 8
FROM openjdk:8-jdk

# Set the working directory within the container 
WORKDIR /app

# Copy your Java application files into the container 
#COPY AgroTechSolutions-0.0.1-SNAPSHOT.jar app.jar
COPY /root/Agro-Tech/Agro-Tech/Dockerfile/AgroTechSolutions-0.0.1-SNAPSHOT.jar app.jar
#COPY /var/lib/jenkins/workspace/Agro-Tech-DevOps/Dockerfile/AgroTechSolutions-0.0.1-SNAPSHOT.jar app.jar
# Expose any ports your application listens on 
EXPOSE 8089

# Define the command to run your Java application
#CMD ["java", "-jar", "app.jar"]
CMD ["java", "-jar", "app.jar", "--server.port=8089"]

