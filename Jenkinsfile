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
                    echo 'Installing npm dependencies...'
                    sh 'npm ci'  // Installs dependencies based on the package-lock.json
                }
            }
        }

        stage('Install Playwright') {
            steps {
                script {
                    echo 'Installing Playwright...'
                    sh 'npx playwright install'  // Installs Playwright browser binaries
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    echo 'Running Playwright tests...'
                    sh 'npx playwright test'  // Runs Playwright tests
                }
            }
        }

        stage('Publish Test Report') {
            steps {
                script {
                    // You can optionally publish your results here (if using a reporter like Allure)
                    echo 'Publishing Test Report...'
                    allure([
                        includeProperties: false,
                        results: [[path: 'playwright-report/allure-results']]
                    ])
                }
            }
        }
    }

    post {
        always {
            cleanWs()  // Clean workspace after job
        }
        success {
            echo 'Tests passed!'
        }
        failure {
            echo 'Tests failed!'
        }
    }
}
