import { makeAutoObservable, runInAction } from "mobx";
import { ChatModel } from "../model/ChatModel";
import { chatApi } from "../api/chatApi";

class ChatsListStore {
    // Map для быстрого поиска по chatId
    chatsMap: Map<string, ChatModel> = new Map();
    // Массив ID для сохранения порядка сортировки
    chatsOrder: string[] = []; 
    
    isLoading: boolean = false;
    isSearching: boolean = false;
    searchError: string | null = null;

    constructor() {
        // this.loadContacts();
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

    async findChatByPhone(phoneNumber: number): Promise<string | null> {
        this.isSearching = true;
        this.searchError = null;

        try {
            // 1. Проверяем существование аккаунта
            const checkResult = await chatApi.checkAccountByPhone({ phoneNumber });

            if (!checkResult.exist) {
                runInAction(() => {
                    this.searchError = "Аккаунт с таким номером не найден";
                    this.isSearching = false;
                });
                return null;
            }

            const chatId = checkResult.chatId;

            // 2. Если чат уже есть в списке — просто возвращаем его ID
            if (this.chatsMap.has(chatId)) {
                runInAction(() => {
                    this.isSearching = false;
                });
                return chatId;
            }

            // 3. Если чата нет в списке — создаем новую модель и загружаем инфо
            const newChat = new ChatModel(chatId);
            runInAction(() => {
                this.chatsMap.set(chatId, newChat);
                this.chatsOrder.unshift(chatId); // добавляем в начало списка
            });

            // 4. Загружаем детальную информацию о чате
            try {
                const chatInfo = await chatApi.getChatInfo({ chatId });
                runInAction(() => {
                    newChat.updateFromInfo(chatInfo);
                    this.isSearching = false;
                });
            } catch (infoError) {
                console.error("Не удалось загрузить информацию о чате:", infoError);
                runInAction(() => {
                    this.isSearching = false;
                });
            }

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

export const chatsListStore = new ChatsListStore();