pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-token')
        DOCKERHUB_USER = 'mafoulou97'
        IMAGE_TAG = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                sh "docker build -t smarttask-backend:${IMAGE_TAG} ./backend"
                sh "docker build -t smarttask-frontend:${IMAGE_TAG} ./frontend"
            }
        }

        stage('Tag Docker Images') {
            steps {
                sh "docker tag smarttask-backend:${IMAGE_TAG} ${DOCKERHUB_USER}/smarttask-backend:${IMAGE_TAG}"
                sh "docker tag smarttask-frontend:${IMAGE_TAG} ${DOCKERHUB_USER}/smarttask-frontend:${IMAGE_TAG}"
                sh "docker tag smarttask-backend:${IMAGE_TAG} ${DOCKERHUB_USER}/smarttask-backend:latest"
                sh "docker tag smarttask-frontend:${IMAGE_TAG} ${DOCKERHUB_USER}/smarttask-frontend:latest"
            }
        }

        stage('Docker Login') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh "docker push ${DOCKERHUB_USER}/smarttask-backend:${IMAGE_TAG}"
                sh "docker push ${DOCKERHUB_USER}/smarttask-frontend:${IMAGE_TAG}"
                sh "docker push ${DOCKERHUB_USER}/smarttask-backend:latest"
                sh "docker push ${DOCKERHUB_USER}/smarttask-frontend:latest"
            }
        }
    }

    post {
        success {
            echo "Pipeline reussi pour la branche ${env.BRANCH_NAME}"
        }
        failure {
            echo "Echec du pipeline pour la branche ${env.BRANCH_NAME} - voir les logs ci-dessus"
        }
        always {
            sh 'docker logout || true'
        }
    }
}
