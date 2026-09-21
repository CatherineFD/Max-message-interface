// src/stores/MessagesStore.ts
import { makeAutoObservable, runInAction } from "mobx";
import { MessageDirection, MessageModel } from "../model/MessageModel";

class MessagesStore {
  messagesByChat = new Map<string, MessageModel[]>();

  constructor() {
    makeAutoObservable(this);
  }

  addMessage(chatId: string, data: Partial<MessageModel>) {
    runInAction(() => {
      let list = this.messagesByChat.get(chatId);
      if (!list) {
        list = [];
        this.messagesByChat.set(chatId, list);
      }

      const msg = new MessageModel({
        id: data.id!,
        chatId,
        text: data.text ?? '',
        type: data.type ?? 'text',
        status: data.status ?? 'delivered',
        direction: data.direction ?? MessageDirection.incoming,
      });

      list.push(msg);
      this.messagesByChat.set(chatId, list);
    });
  }

  getMessages(chatId: string) {
    return this.messagesByChat.get(chatId) || [];
  }
}

export const messagesStore = new MessagesStore();