import axios from 'axios';
import type { Message, SendMessagePayload, MessageResponse } from '../types/api/message';
import type {
  ContactPayload,
  ContactsList,
  ChatPayload,
  ChatResponse,
  ChatInfoPayload,
  ChatInfo,
  CreateContactPayload,
  CreateContaceResponse,
} from '../types/api/contact';
import type {
  ReceiveNotification,
} from '../types/api/message';
import { instanceStore } from '../stores/InstanceStore';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: API_BASE,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use((config) => {
  const cfg = instanceStore.config;

  if (!cfg) {
    throw new Error('Instance config is not set');
  }

  const { idInstance, apiTokenInstance } = cfg;

  if (config.url) {
    config.url = config.url
      .replace('{idInstance}', idInstance)
      .replace('{apiTokenInstance}', apiTokenInstance);
  }

  return config;
});

export const chatApi = {
  async sendMessage(payload: SendMessagePayload): Promise<MessageResponse> {
    const { data } = await api.post<MessageResponse>(
      '/waInstance{idInstance}/sendMessage/{apiTokenInstance}',
      payload
    );
    return data;
  },

  async fetchMessages(since?: number): Promise<Message[]> {
    const params = since ? { since } : {};
    const { data } = await api.get<Message[]>(
      '/waInstance{idInstance}/receiveNotification/{apiTokenInstance}',
      { params }
    );
    return data;
  },

  async getContacts(params?: ContactPayload): Promise<ContactsList[]> {
    const { data } = await api.get<ContactsList[]>(
      '/waInstance{idInstance}/getContacts/{apiTokenInstance}',
      { params: { count: params?.count } }
    );
    return data;
  },

  async checkAccountByPhone(payload: ChatPayload): Promise<ChatResponse> {
    const { data } = await api.post<ChatResponse>(
      '/waInstance{idInstance}/checkAccount/{apiTokenInstance}',
      payload
    );
    return data;
  },

  async getChatInfo(payload: ChatInfoPayload): Promise<ChatInfo> {
    const { data } = await api.post<ChatInfo>(
      '/waInstance{idInstance}/getContactInfo/{apiTokenInstance}',
      payload
    );
    return data;
  },

  async addContact(payload: CreateContactPayload): Promise<CreateContaceResponse> {
    const { data } = await api.post<CreateContaceResponse>(
      '/waInstance{idInstance}/addContact/{apiTokenInstance}',
      payload
    );
    return data;
  },

  /**
     * Получение входящих уведомлений (Long Polling)
     * @param receiveTimeout Время ожидания в секундах (от 5 до 60)
     */
    async receiveNotification(receiveTimeout?: number): Promise<ReceiveNotification> {
      const { data } = await api.get<ReceiveNotification>(
          `/waInstance{idInstance}/receiveNotification/{apiTokenInstance}`,
          { params: { receiveTimeout } }
      );
      return data;
    },

    /**
     * Удаление обработанного уведомления из очереди
     */
    async deleteNotification(receiptId: number): Promise<boolean> {
        try {
            const { data } = await api.delete<boolean>(`/waInstance{idInstance}/deleteNotification/{apiTokenInstance}/${receiptId}`);
            return data;
        } catch (error) {
            console.error(`Не удалось удалить уведомление ${receiptId}:`, error);
            return false;
        }
    },

    async GetWebhooksCount(): Promise<{count: number}> {
      const { data } = await api.get<{count: number}>(`/waInstance{idInstance}/getWebhooksCount/{apiTokenInstance}`);
      return data;
    }
};