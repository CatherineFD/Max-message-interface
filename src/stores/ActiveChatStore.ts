import { makeAutoObservable, runInAction } from "mobx";
import { chatsListStore } from "./ChatsListStore";
import { chatApi } from "../api/chatApi";

class ActiveChatStore {
    currentChatId: string | null = null;
    isLoadingInfo: boolean = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get currentChat() {
        if (!this.currentChatId) return null;
        return chatsListStore.getChatById(this.currentChatId);
    }

    setError(error: string) {
        this.error = error;
    }

    async openChat(chatId: string) {
        this.currentChatId = chatId;
        
        // Если детальная инфа еще не загружена (или устарела), запрашиваем её
        const chat = this.currentChat;
        if (chat && !chat.avatar) { 
            await this.loadChatInfo(chatId);
        }
        
        // Загружаем сообщения (логика загрузки сообщений тут)
        // await this.loadMessages(chatId);
    }

    async loadChatInfo(chatId: string) {
        this.isLoadingInfo = true;
        try {
            const info = await chatApi.getChatInfo({chatId});
            runInAction(() => {
                const chat = chatsListStore.getChatById(chatId);
                if (chat) {
                    // "Обогащаем" существующую модель данными из ChatInfo
                    chat.updateFromInfo(info); 
                }
                this.isLoadingInfo = false;
            });
        } catch {
            this.isLoadingInfo = false;
            this.setError('Ошибка загрузки');
        }
    }

    async sendMessage(message: string) {
        if (!this.currentChatId) return;

        this.isLoadingInfo = true;

        try {
            const response = await chatApi.sendMessage({ chatId: this.currentChatId, message});
            console.log(response);
        } catch {
            this.setError('Ошибка при отправке сообщения');
        } finally {
            this.isLoadingInfo = false;
        }
    }

    closeChat() {
        this.currentChatId = null;
    }
}

export const activeChatStore = new ActiveChatStore();