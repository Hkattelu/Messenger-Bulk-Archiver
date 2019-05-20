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
  menuOptions.filter((el) => el.innerText === 'Archive')[0].click();
}

archiveConversation(0);
