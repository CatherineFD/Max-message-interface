import { makeAutoObservable } from 'mobx';
import { MessageModel, MessageDirection, type MessageType, type MessageStatus } from '../../model/MessageModel';

export interface MessageInput {
  id: string;
  text: string;
  type: MessageType;
  status: MessageStatus;
  direction: MessageDirection;
  timestamp?: number;
}

export default class MessagesStore {
  private messagesMap: Map<string, Map<string, MessageModel>> = new Map();

  constructor() {
    makeAutoObservable(this);
  }

  getMessages(chatId: string): MessageModel[] {
    const chatMessages = this.messagesMap.get(chatId);
    return chatMessages ? Array.from(chatMessages.values()) : [];
  }

  addMessage(chatId: string, messageData: MessageInput) {
    if (!this.messagesMap.has(chatId)) {
      this.messagesMap.set(chatId, new Map());
    }

    const chatMessages = this.messagesMap.get(chatId)!;
    
    if (!chatMessages.has(messageData.id)) {
      const message = new MessageModel({
        ...messageData,
        chatId,
      });
      chatMessages.set(messageData.id, message);
    }
  }

  clearChatMessages(chatId: string) {
    this.messagesMap.delete(chatId);
  }
}

export const messagesStore = new MessagesStore();