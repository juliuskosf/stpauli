exports.config = {
  specs: ['testing/test-spec.js'],
  capabilities: {
    'browserName': 'chrome' // or 'safari'
  },
  allScriptsTimeout: 50000
};
