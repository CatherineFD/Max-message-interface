import { makeAutoObservable, runInAction } from 'mobx';
import { ChatModel } from '../../model/ChatModel';

export default class ActiveChatStore {
  currentChatId: string | null = null;
  chat: ChatModel | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setActiveChat(chatId: string | null, chat: ChatModel | null = null) {
    runInAction(() => {
      this.currentChatId = chatId;
      this.chat = chat;
    });
  }

  clear() {
    runInAction(() => {
      this.currentChatId = null;
      this.chat = null;
    });
  }
}

export const activeChatStore = new ActiveChatStore();