window.addEventListener('load', function(event) {
  document.getElementById('archiveFirst').onclick = function(element) {
    chrome.tabs.query(
      {active: true, currentWindow: true},
      function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {file: 'archiveFirst.js'});
      }
    );
  };
});
