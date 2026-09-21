import { makeAutoObservable } from "mobx";
import { MessageModel } from "../model/MessageModel";

class MessagesStore {
  messagesByChat = new Map<string, MessageModel[]>();

  constructor() {
    makeAutoObservable(this);
  }

  addIncomingMessage(chatId: string, payload: Partial<MessageModel>) {
    const list = this.messagesByChat.get(chatId) || [];
    const msg = new MessageModel({
      id: payload.id!,
      chatId,
      text: payload.text || '',
      type: payload.type || 'text',
      status: 'delivered',
      ...payload
    });
    list.push(msg);
    this.messagesByChat.set(chatId, list);
  }

  getMessages(chatId: string) {
    return this.messagesByChat.get(chatId) || [];
  }
}

export const messagesStore = new MessagesStore();