pipeline {
    agent {
        docker {
            image 'node:18.17.1-alpine3.18'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'node --version'
                echo 'Building...'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}