const MESSENGER_DOMAIN = 'messenger.com';

window.addEventListener('load', () => {
  chrome.tabs.onUpdated.addListener((_, changeInfo, tab) => {
    if (!changeInfo.url && changeInfo.status !== 'complete') {
      return;
    }

    const isMessenger = tab.url?.includes(MESSENGER_DOMAIN) ?? false;
    isMessenger ? chrome.action.enable() : chrome.action.disable();
  });

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0].url.includes(MESSENGER_DOMAIN)) {
      return;
    }

    // Load helper functions
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ['helpers.js']
    });

    const isArchivePage = tabs[0].url.includes('archived');
    document.getElementById('archive-all').innerText = `${isArchivePage ? 'Una' : 'A'}rchive all conversations`;
    document.getElementById('archive-first').innerText = `${isArchivePage ? 'Una' : 'A'}rchive the first conversation`;

      document.getElementById('archive-first').addEventListener('click', () => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: () => archiveConversation(0)
        });
      });

      document.getElementById('archive-all').addEventListener('click', () => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: () => archiveAllConversations()
        });
      });
    }
  );
});