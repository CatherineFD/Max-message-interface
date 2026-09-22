import { makeAutoObservable, runInAction } from "mobx";
import { chatApi } from "../../api/chatApi";
import type { ContactsList } from "../../types/contact";

export default class ChatsListStore {
  chatsMap: Map<string, ContactsList> = new Map();
  chatsOrder: string[] = [];
  activeChatId: string = '';

  isLoading: boolean = false;
  isSearching: boolean = false;
  searchError: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get chatsList(): ContactsList[] {
    return this.chatsOrder.map(id => this.chatsMap.get(id)!);
  }

  getChatById(chatId: string): ContactsList | undefined {
    return this.chatsMap.get(chatId);
  }

  setActiveChat(chatId: string) {
    this.activeChatId = chatId;
  }

  addChatToList(chat: ContactsList) {
    if (!this.chatsMap.has(chat.chatId)) {
      this.chatsMap.set(chat.chatId, chat);
      this.chatsOrder.unshift(chat.chatId);
    }
  }

  async loadContacts() {
    this.isLoading = true;
    try {
      const response = await chatApi.getContacts();
      runInAction(() => {
        this.chatsOrder = [];
        response.forEach(contact => {
          let chat = this.chatsMap.get(contact.chatId);
          if (!chat) {
            chat = {
              chatId: contact.chatId,
              name: contact.name,
              contactName: contact.contactName,
              phoneNumber: contact.phoneNumber,
              type: contact.type,
            };
            this.chatsMap.set(contact.chatId, chat);
          }
          this.chatsOrder.push(contact.chatId);
        });
        this.isLoading = false;
      });
    } catch {
      this.isLoading = false;
    }
  }

  async findChatByPhone(phoneNumber: number): Promise<string | null> {
    this.isSearching = true;
    this.searchError = null;

    try {
      const checkResult = await chatApi.checkAccountByPhone({ phoneNumber });

      if (!checkResult.exist) {
        runInAction(() => {
          this.searchError = "Аккаунт с таким номером не найден";
          this.isSearching = false;
        });
        return null;
      }

      const chatId = checkResult.chatId;

      if (this.chatsMap.has(chatId)) {
        runInAction(() => {
          this.isSearching = false;
        });
        return chatId;
      }

      const newChat: ContactsList = {
        chatId,
        name: '',
        contactName: '',
        phoneNumber: phoneNumber,
        type: 'private',
      };

      runInAction(() => {
        this.addChatToList(newChat);
        this.isSearching = false;
      });

      return chatId;

    } catch (error) {
      runInAction(() => {
        this.searchError = "Ошибка при поиске контакта";
        this.isSearching = false;
      });
      console.error("Ошибка поиска по номеру:", error);
      return null;
    }
  }
}