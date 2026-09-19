import axios from 'axios';
import type { Message, SendMessagePayload } from '../types/api/message';
import type {
    ContactPayload,
    ContactsList,
    ChatPayload,
    ChatResponse,
    ChatInfoPayload,
    ChatInfo,
} from '../types/api/contact';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const waInstance = '310022739057';
const apiTokenInstance = '1ee0188248de4967abc5ea37e931549ee9039a1a47e746ca8e';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

//TODO правильные запросы сделать
export const chatApi = {
    /**
     * Отправка сообщения
     */
    async sendMessage(payload: SendMessagePayload): Promise<Message> {
        const { data } = await api.post<Message>(`/waInstance${waInstance}/sendMessage/${apiTokenInstance}`, payload);
        return data;
    },

    /**
     * Получение новых сообщений
     */
    async fetchMessages(since?: number): Promise<Message[]> {
        const params = since ? { since } : {};
        const { data } = await api.get<Message[]>('/api/messages/receive', { params });
        return data;
    },

    async getContacts(params?: ContactPayload): Promise<ContactsList[]> {
        const { data } = await api.get<ContactsList[]>(`/waInstance${waInstance}/getContacts/${apiTokenInstance}?count=${params?.count}`);

        return data;
    },

    async checkAccountByPhone(payload: ChatPayload): Promise<ChatResponse> {
        const { data } = await api.post<ChatResponse>(`/waInstance${waInstance}/checkAccount/${apiTokenInstance}`, payload);

        return data;
    },

    async getChatInfo(payload: ChatInfoPayload): Promise<ChatInfo> {
        const { data } = await api.post<ChatInfo>(`/waInstance${waInstance}/getContactInfo/${apiTokenInstance}`, payload);

        return data;
    }
};