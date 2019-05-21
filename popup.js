window.addEventListener('load', function(event) {
  chrome.tabs.query(
    {active: true, currentWindow: true},
    function(tabs) {
      // Load helper functions
      chrome.tabs.executeScript(tabs[0].id, {file: 'helpers.js'});
      document.getElementById('archiveFirst').onclick = function(element) {
          chrome.tabs.executeScript(tabs[0].id, {code: 'archiveConversation(0)'});
      };
      document.getElementById('archiveBatch').onclick = function(element) {
          chrome.tabs.executeScript(tabs[0].id, {code: 'archiveConversationsInView()'});
      };
      document.getElementById('archiveAll').onclick = function(element) {
          chrome.tabs.executeScript(tabs[0].id, {code: 'archiveAllConversations()'});
      };
    }
  );
});
