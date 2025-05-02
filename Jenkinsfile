pipeline {
    agent any

    tools {
        nodejs 'NodeJS_18'  // Make sure this matches the Node version you installed in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/your-username/your-playwright-repo.git'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Playwright tests') {
            steps {
                sh 'npx playwright install' // Ensures required browsers are installed
                sh 'npx playwright test'
            }
        }

        stage('Archive Results') {
            steps {
                junit 'test-results/**/*.xml' // Optional: if you generate JUnit-style reports
            }
        }
    }
}
