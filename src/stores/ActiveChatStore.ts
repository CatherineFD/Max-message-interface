import { makeAutoObservable, runInAction } from "mobx";
import { chatsListStore } from "./ChatsListStore";
import { chatApi } from "../api/chatApi";
import type { ChatModel } from "../model/ChatModel";
import { MessageModel } from "../model/MessageModel";


//TODO загружать диалог
class ActiveChatStore {
    currentChatId: string | null = null;
    isLoadingInfo: boolean = false;
    error: string | null = null;
    chat: ChatModel | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get currentChat() {
        return this.chat;
    }

    setError(error: string) {
        this.error = error;
    }

    setChat() {
        if (!this.currentChatId) return null;
        this.chat = chatsListStore.getChatById(this.currentChatId) || null;
    }

    async openChat(chatId: string) {
        this.currentChatId = chatId;
        this.setChat();

        const chat = chatsListStore.getChatById(this.currentChatId);
        if (chat && !chat.avatar) { 
            await this.loadChatInfo(chatId);
        }
    }

    async loadChatInfo(chatId: string) {
        this.isLoadingInfo = true;
        try {
            const info = await chatApi.getChatInfo({chatId});
            runInAction(() => {
                const chat = chatsListStore.getChatById(chatId);
                if (chat) {
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

            const newMessage = new MessageModel({
                id: response.idMessage,
                chatId: this.currentChatId,
                text: message,
                status: "sending",
                type: "text"
            });
            this.chat?.addMessage(newMessage);
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