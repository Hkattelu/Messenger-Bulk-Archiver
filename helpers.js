function getConversationActionMenuItems() {
  return document.querySelectorAll('div[role="menu"] [role="menuitem"]');
}

function getConversationList() {
  return document.querySelector('div[aria-label="Chats"]').querySelectorAll('[role=row]');
}

function openConversationActionMenuForConversation(index) {
  const chatItem = getConversationList()[index];

  const event = new MouseEvent('mouseover', {bubbles: true, cancelable: true});
  chatItem.dispatchEvent(event);

  let resolver = () => {};
  const menuOpenedPromise = new Promise((resolve) => {
    resolver = resolve;
  })

  setTimeout(() => {
    chatItem.querySelector('div[aria-label="Menu"]').click();
    setTimeout(resolver, 100);
  }, 100);

  return menuOpenedPromise;
}

async function archiveConversation(index) {
  await openConversationActionMenuForConversation(index);
  const menuOptions = Array.from(getConversationActionMenuItems());

  // We will target based on the archive icon svg path.
  const archiveButton = menuOptions.find(el => el.querySelector('[d="M8 7.5a1 1 0 00-1 1V10a1 1 0 001 1h20a1 1 0 001-1V8.5a1 1 0 00-1-1H8z"'));
  if (archiveButton) {
    archiveButton.click();
  }

  let resolver = () => {};
  const chatArchivedPromise = new Promise((resolve) => {
    resolver = resolve;
  })
  setTimeout(resolver, 75);
  return chatArchivedPromise;
}

async function archiveAllConversations() {
  let conversationList = getConversationList();
  while (conversationList.length > 0) {
    conversationList[0].scrollIntoView();
    await archiveConversation(0);

    conversationList = getConversationList();
  }
}
