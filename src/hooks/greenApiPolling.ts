import { activeChatStore } from '../stores/ActiveChatStore';
import { messagesStore } from '../stores/MessagesStore';
import { chatApi } from '../api/chatApi';
import { MessageModel } from '../model/MessageModel';
import type { ReceiveNotificationBody } from '../types/api/message';

let pollingActive = false;

export function startGreenApiPolling() {
  if (pollingActive) return;
  pollingActive = true;

  (async () => {
    while (pollingActive) {
      try {
        const notification = await chatApi.receiveNotification();
        if (!notification) {
          await sleep(1000);
          continue;
        }

        const { receiptId, body } = notification;
        handleMessageFromApi(body);
        await chatApi.deleteNotification(receiptId);
      } catch {
        await sleep(5000);
      }
    }
  })();
}

export function stopGreenApiPolling() {
  pollingActive = false;
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function handleMessageFromApi(body: ReceiveNotificationBody) {

  const chatId = body.senderData.chatId;
  if (!chatId) return;

  const text = body.messageData.textMessageData.textMessage || '';

  messagesStore.addIncomingMessage(chatId, {
    id: body.idMessage,
    text,
    type: 'text'
  });

  if (activeChatStore.currentChatId === chatId && activeChatStore.chat) {
    const newMsg = new MessageModel({
      id: body.idMessage,
      chatId,
      text,
      type: 'text',
      status: 'delivered'
    });
    activeChatStore.chat.addMessage(newMsg);
  }
}