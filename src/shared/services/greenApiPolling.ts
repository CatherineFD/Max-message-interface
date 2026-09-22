import type { ReceiveNotificationBody } from '../../types/message';
import { chatApi } from '../../api/chatApi';

type MessageHandler = (chatId: string, message: ReceiveNotificationBody) => void;

let pollingActive = false;
let messageHandler: MessageHandler | null = null;

export function setPollingMessageHandler(handler: MessageHandler) {
  messageHandler = handler;
}

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
        await chatApi.deleteNotification(receiptId);
        
        if (messageHandler) {
          const chatId = body.senderData?.chatId;
          if (chatId) {
            messageHandler(chatId, body);
          }
        }
      } catch {
        await sleep(5000);
      }
    }
  })();
}

export function stopGreenApiPolling() {
  pollingActive = false;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}