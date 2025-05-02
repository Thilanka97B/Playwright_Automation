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
                    // Run Playwright tests and generate JUnit-style XML report
                    sh 'npx playwright test --reporter=junit --output=playwright-report'
                }
            }
        }

        stage('Publish Test Report') {
            steps {
                script {
                    // Publish the test report to Jenkins
                    junit '**/playwright-report/**/*.xml'
                }
            }
        }
    }

    post {
        always {
            // Clean up workspace or perform other post-test actions
            cleanWs()
        }
        success {
            // Send success notifications or additional steps
            echo 'Tests passed!'
        }
        failure {
            // Send failure notifications or additional steps
            echo 'Tests failed!'
        }
    }
}
