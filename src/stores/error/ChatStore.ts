import { makeAutoObservable, runInAction } from 'mobx';
import { chatApi } from '../../api/chatApi';
import type { Message } from '../../types/api/message';

export class ChatStore {
  messages: Message[] = [];
  isLoading = false;
  isSending = false;
  error: string | null = null;

  private pollInterval: ReturnType<typeof setInterval> | null = null;
  private lastTimestamp = 0;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Отправка сообщения
   */
  async sendMessage(text: string) {
    if (!text.trim() || this.isSending) return;

    this.isSending = true;
    this.error = null;

    try {
      const message = await chatApi.sendMessage({chatId: '111', message: text });
      runInAction(() => {
        this.messages.push({
          ...message,
          direction: 'outgoing',
        });
      });
    } catch {
      runInAction(() => {
        this.error = 'Не удалось отправить сообщение';
      });
    } finally {
      runInAction(() => {
        this.isSending = false;
      });
    }
  }

  /**
   * Загрузка новых сообщений
   */
  async fetchMessages() {
    if (this.isLoading) return;

    this.isLoading = true;
    try {
      const newMessages = await chatApi.fetchMessages(this.lastTimestamp);
      runInAction(() => {
        // Добавляем только новые сообщения (избегаем дубликатов)
        const existingIds = new Set(this.messages.map((m) => m.id));
        const unique = newMessages.filter((m) => !existingIds.has(m.id));

        this.messages.push(
          ...unique.map((m) => ({
            ...m,
            direction: 'incoming' as const,
          }))
        );

        if (unique.length > 0) {
          this.lastTimestamp = Math.max(...unique.map((m) => m.timestamp));
        }
      });
    } catch {
      runInAction(() => {
        this.error = 'Ошибка загрузки сообщений';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  /**
   * Запуск polling (опрос сервера каждые 3 секунды)
   */
  startPolling(intervalMs = 3000) {
    if (this.pollInterval) return;

    // this.fetchMessages(); // первичная загрузка
    this.pollInterval = setInterval(() => {
    //   this.fetchMessages();
    }, intervalMs);
  }

  /**
   * Остановка polling
   */
  stopPolling() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }

  /**
   * Очистка
   */
  clear() {
    this.stopPolling();
    this.messages = [];
    this.lastTimestamp = 0;
    this.error = null;
  }
}