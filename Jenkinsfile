pipeline {
    agent any
    
     environment {     
        DOCKER_REGISTRY = "192.168.137.140:5000"
        DOCKER_IMAGE_NAME = "pfee/frontend"  // Adjusted to lowercase for Docker compatibility
        DOCKER_IMAGE_TAG = "${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:${BUILD_NUMBER}"
    }
    stages {
        stage('Checkout Code') {
            steps {
                // Checkout your source code from your Git repository
                script {
                    git branch: 'main', url: 'https://github.com/Wassim-Bessioud/PFE-Frontend.git'
                }
            }
        }
        stage('Sonar Analysis') {
            steps {
                script {
                    nodejs(nodeJSInstallationName: 'Node') {
                        sh "npm install"
                        sh "npm install sonar-scanner"
                        sh "npm run sonar"
                    }
                }
            }
        }
      stage('Build and Push Docker Registry') {
            steps {
                script {
                    
                    docker.build("${DOCKER_IMAGE_TAG}", "-f Dockerfile .")

                    
                        docker.image("${DOCKER_IMAGE_TAG}").push()
                    
                }
            }
        }
    }
}
