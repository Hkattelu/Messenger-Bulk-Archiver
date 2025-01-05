function getConversationActionMenuItems() {
  const menu = document.querySelectorAll('div[role="menu"] [role="menuitem"]');
  if (!menu) {
    throw new Error('Menu not found. Make sure you are on messenger.com');
  }
  return menu;
}

function getConversationList() {
  const chatsContainer = document.querySelector('div[aria-label="Chats"]');
  if (!chatsContainer) {
    throw new Error('Chats container not found. Make sure you are on messenger.com');
  }
  const rows = chatsContainer.querySelectorAll('[role=row]');
  if (!rows || rows.length === 0) {
    throw new Error('No conversations found');
  }
  return rows;
}

const MAX_RETRIES = 3;
function openConversationActionMenuForConversation(index, retryCount = 0) {
  const chatItem = getConversationList()[index];

  const event = new MouseEvent('mouseover', { bubbles: true, cancelable: true });
  chatItem.dispatchEvent(event);

  const menuOpenedPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const menuButton = chatItem.querySelector('div[aria-label="Menu"]');
      if (!menuButton) {
        if (retryCount < MAX_RETRIES) {
          openConversationActionMenuForConversation(index, retryCount + 1)
            .then(resolve)
            .catch(reject);
        } else {
          reject(new Error('Menu button not found'));
        }
        return;
      }
      menuButton.click();
      setTimeout(resolve, 100);
    }, 100);
  })


  return menuOpenedPromise;
}

async function archiveConversation(index) {
  await openConversationActionMenuForConversation(index);
  const menuOptions = Array.from(getConversationActionMenuItems());

  // We will target based on the archive icon svg path.
  const archiveButton = menuOptions.find(el => el.querySelector('[d="M8 7.5a1 1 0 00-1 1V10a1 1 0 001 1h20a1 1 0 001-1V8.5a1 1 0 00-1-1H8z"'));
  if (!archiveButton) {
    throw new Error('Archive button not found');
  }

  archiveButton.click();
  return new Promise(resolve => setTimeout(resolve, 75));
}

async function archiveAllConversations() {
  let conversationList = getConversationList();
  let failedAttempts = 0;

  while (conversationList.length > 0 && failedAttempts < MAX_RETRIES) {
    try {
      conversationList[0].scrollIntoView();
      await archiveConversation(0);
      failedAttempts = 0; // Reset failed attempts on success
    } catch (error) {
      failedAttempts++;
      console.error(`Archive attempt failed (${failedAttempts}/${maxFailedAttempts}):`, error);
      if (failedAttempts >= MAX_RETRIES) {
        throw new Error('Max failed attempts reached');
      }
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait before retry
    }

    conversationList = getConversationList();
  }
}
