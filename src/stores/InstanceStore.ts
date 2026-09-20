import { makeAutoObservable, runInAction } from "mobx";
import { chatApi } from "../api/chatApi";

interface InstanceConfig {
    idInstance: string;
    apiTokenInstance: string;
}

class InstanceStore {
    config: InstanceConfig | null = null;
    isLoading: boolean = false;
    isConnected: boolean = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
        this.loadFromStorage();
    }

    private loadFromStorage() {
        const saved = localStorage.getItem('instance_config');
        if (saved) {
            try {
                this.config = JSON.parse(saved);
            } catch (e) {
                console.error('Ошибка загрузки конфигурации:', e);
            }
        }
    }

    // Сохранение в localStorage
    private saveToStorage(config: InstanceConfig) {
        localStorage.setItem('instance_config', JSON.stringify(config));
    }

    async setConfig(values: InstanceConfig): Promise<boolean> {
        this.isLoading = true;
        this.error = null;

        try {
            // Проверяем подключение к API
            const isValid = await this.testConnection();
            
            if (!isValid) {
                throw new Error('Неверные данные экземпляра');
            }

            runInAction(() => {
                this.config = values;
                this.saveToStorage(values);
                this.isLoading = false;
                this.isConnected = true;
            });

            return true;
        } catch (error) {
            runInAction(() => {
                this.error = error instanceof Error ? error.message : 'Не удалось подключиться к API';
                this.isLoading = false;
            });
            return false;
        }
    }

    async testConnection(): Promise<boolean> {
        try {
            await chatApi.getContacts({ count: 1 });
            return true;
        } catch (error) {
            console.error('Ошибка подключения:', error);
            return false;
        }
    }

    clearConfig() {
        this.config = null;
        this.isConnected = false;
        localStorage.removeItem('instance_config');
    }

    get isConfigured(): boolean {
        return this.config !== null;
    }
}

export const instanceStore = new InstanceStore();