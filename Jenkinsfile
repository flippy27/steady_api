pipeline{
    agent{
        docker{ image 'node:18-alpine3.17' }
    }
    stages{
        stage('Test'){
            steps{
                sh 'node --version'
            }
        }
    }
}
