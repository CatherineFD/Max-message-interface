import { makeAutoObservable, runInAction } from "mobx";
import { ChatModel } from "../../model/ChatModel";
import { chatApi } from "../../api/chatApi";
import { MessageModel } from "../../model/MessageModel";
import { activeChatStore } from "../../shared/stores/ActiveChatStore";

export default class ChatStore {
    isLoading: boolean = false;
    error: string | null = null;
    currentChat: ChatModel | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setError(error: string | null) {
        this.error = error;
    }

    setLoading(loading: boolean) {
        this.isLoading = loading;
    }

    async loadChat(chatId: string) {
        this.setLoading(true);
        this.setError(null);

        try {
        const chatInfo = await chatApi.getChatInfo({ chatId });
        
        runInAction(() => {
            this.currentChat = new ChatModel(chatId);
            this.currentChat.updateFromInfo(chatInfo);
            this.isLoading = false;
            activeChatStore.setActiveChat(chatId, this.currentChat);
        });
        } catch {
            this.setError("Не удалось загрузить чат");
            this.setLoading(false);
        }
    }

    async sendMessage(message: string) {
        if (!this.currentChat) return;

        this.setLoading(true);

        try {
            const response = await chatApi.sendMessage({ chatId: this.currentChat.chatId, message});

            this.currentChat.addMessage(new MessageModel({
                id: response.idMessage,
                chatId: this.currentChat.chatId,
                text: message,
                status: 'sending',
                type: 'text',
            }));
        } catch {
            this.setError('Ошибка при отправке сообщения');
        } finally {
            this.setLoading(false);
        }
    }

    clearChat() {
        this.currentChat = null;
        this.error = null;
    }
}