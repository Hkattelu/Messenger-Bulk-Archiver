window.addEventListener('load', (event) => {
  chrome.tabs.query(
    {active: true, currentWindow: true}, (tabs) => {
      // Load helper functions
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['helpers.js']
      });
      
      document.getElementById('archive-first').addEventListener('click', (element) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: () => archiveConversation(0)
        });
      });

      document.getElementById('archive-all').addEventListener('click', (element) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: () => archiveAllConversations()
        });
      });
    }
  );
});