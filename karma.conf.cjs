const fs = require('fs');
const path = require('path');

// Auto-detección de navegadores basados en Chromium para Windows / CI
const potentialEdgePaths = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];

const potentialChromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe'),
];

if (!process.env.CHROME_BIN) {
  const chromeFound = potentialChromePaths.find((p) => fs.existsSync(p));
  if (chromeFound) {
    process.env.CHROME_BIN = chromeFound;
  } else {
    const edgeFound = potentialEdgePaths.find((p) => fs.existsSync(p));
    if (edgeFound) {
      process.env.CHROME_BIN = edgeFound;
    }
  }
}

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      { pattern: 'tests/setup.js', watched: false },
      { pattern: 'src/**/*.spec.js', watched: false },
      { pattern: 'tests/**/*.spec.js', watched: false },
    ],
    preprocessors: {
      'tests/setup.js': ['esbuild'],
      'src/**/*.spec.js': ['esbuild'],
      'tests/**/*.spec.js': ['esbuild'],
    },
    esbuild: {
      target: 'es2022',
      jsx: 'automatic',
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx',
        '.css': 'empty',
        '.svg': 'text',
        '.png': 'file',
        '.jpg': 'file',
      },
      define: {
        'process.env.NODE_ENV': '"test"',
      },
      singleBundle: true,
    },
    reporters: ['spec'],
    specReporter: {
      maxLogLines: 5,
      suppressErrorSummary: false,
      suppressFailed: false,
      suppressPassed: false,
      suppressSkipped: true,
      showSpecTiming: true,
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage',
        ],
      },
    },
    singleRun: true,
    concurrency: Infinity,
  });
};
