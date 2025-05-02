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
                    // Run Playwright tests with Allure reporter
                    echo 'Running Playwright tests...'
                    sh 'npx playwright test --reporter=allure-playwright --output=playwright-report'
                }
            }
        }

        stage('Publish Test Report') {
            steps {
                script {
                    // Publish the Allure report to Jenkins
                    allure([
                        includeProperties: false,
                        jdk: '',
                        results: [[path: 'playwright-report/allure-results']]
                    ])
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
