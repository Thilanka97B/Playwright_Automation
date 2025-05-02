pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout code using stored credentials
                git credentialsId: 'github-credentials', url: 'https://github.com/Thilanka97B/Playwright_Automation.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    sh 'npx playwright test'
                }
            }
        }
    }
}
