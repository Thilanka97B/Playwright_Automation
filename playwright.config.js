// playwright.config.js

module.exports = {
    reporter: [
      ['line'],
      ['allure-playwright']  // Configure Allure for reporting
    ],
    projects: [
      {
        name: 'demoqa-tests',
        testMatch: /.*\.spec\.js/,  // Match test files
        use: {
          headless: true,           // Run tests in headless mode
          video: 'on',              // Enable video recording for tests
          screenshot: 'on',         // Enable screenshot capture
        },
        retries: 1,                 // Retry failed tests once
        workers: 4,                 // Run 4 tests concurrently
      }
    ]
  };
  