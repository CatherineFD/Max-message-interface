import { makeAutoObservable, runInAction } from "mobx";
import { ChatModel } from "./ChatModel";
import { chatApi } from "../api/chatApi";

class ChatsListStore {
    // Map для быстрого поиска по chatId
    chatsMap: Map<string, ChatModel> = new Map();
    // Массив ID для сохранения порядка сортировки
    chatsOrder: string[] = []; 
    
    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    get chatsList(): ChatModel[] {
        return this.chatsOrder.map(id => this.chatsMap.get(id)!);
    }

    getChatById(chatId: string): ChatModel | undefined {
        return this.chatsMap.get(chatId);
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
                        chat = new ChatModel(contact.chatId);
                        this.chatsMap.set(contact.chatId, chat);
                    }
                    chat.updateFromList(contact);
                    this.chatsOrder.push(contact.chatId);
                });
                this.isLoading = false;
            });
        } catch {
            this.isLoading = false;
        }
    }
}

export const chatsListStore = new ChatsListStore();