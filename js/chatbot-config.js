/* Runtime configuration for Easy Loan Services Chatbot */
(function () {
  'use strict';
  
  var configuredApiUrl = (window.LOAN_API_URL || '').trim();
  var hostname = window.location.hostname || '';
  var isLocalHost = ['localhost', '127.0.0.1'].indexOf(hostname) !== -1;
  var isFileProtocol = window.location.protocol === 'file:';
  var apiBaseUrl = configuredApiUrl;

  if (!apiBaseUrl) {
    if (isLocalHost) {
      if (window.location.port === '3000') {
        apiBaseUrl = '';
      } else {
        apiBaseUrl = (window.location.protocol || 'http:') + '//' + hostname + ':3000';
      }
    } else if (isFileProtocol) {
      apiBaseUrl = 'http://localhost:3000';
    } else {
      apiBaseUrl = '';
    }
  }

  window.LOAN_CHATBOT_CONFIG = {
    apiBaseUrl: apiBaseUrl.replace(/\/$/, '')
  };
}());

