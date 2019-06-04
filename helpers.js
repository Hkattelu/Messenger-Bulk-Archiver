function getConversationActionMenu() {
  return document.querySelector('.uiContextualLayer').getElementsByTagName('ul')[0];
}

function getConversationList() {
  return document.querySelector('[aria-label="Conversation List"]');
}

function openConversationActionMenuForConversation(index) {
  getConversationList().children[index].focus();
  document.querySelector('[aria-label="Conversation actions"]').click();
}

function archiveConversation(index) {
  openConversationActionMenuForConversation(index);
  const menuOptions = Array.from(getConversationActionMenu().children);

  // This should be the Archive button
  menuOptions[3].click();
}

function archiveConversationsInView() {
  const numInView = getConversationList().children.length;
  for (var i = 0; i < numInView; i++) {
    archiveConversation(i);
  }
}

async function archiveAllConversations() {
  var conversationList = getConversationList();
  while (conversationList.children.length > 0) {
    // Clear 5, then scroll to the top of the list, then repeat
    for (var i = 0; i < 5; i++) {
      archiveConversation(i);
    }
    document.querySelector('.uiScrollableAreaContent').scrollIntoView();
    conversationList = getConversationList();
  }
}
