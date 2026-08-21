pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Images') {
            steps {
                script {
                    sh 'docker build -t smarttask-backend ./backend'
                    sh 'docker build -t smarttask-frontend ./frontend'
                }
            }
        }
    }
}
