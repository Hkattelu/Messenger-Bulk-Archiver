window.addEventListener('load', function(event) {
  chrome.tabs.query(
    {active: true, currentWindow: true},
    function(tabs) {
      // Load helper functions
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['helpers.js']
      });
      
      document.getElementById('archiveFirst').onclick = function(element) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: () => archiveConversation(0)
        });
      };
      
      document.getElementById('archiveBatch').onclick = function(element) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: () => archiveConversationsInView()
        });
      };
      
      document.getElementById('archiveAll').onclick = function(element) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: () => archiveAllConversations()
        });
      };
    }
  );
});