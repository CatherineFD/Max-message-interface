import { makeAutoObservable } from "mobx";
import { configNames } from '../config/instanceConfig';

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
        const saved = localStorage.getItem(configNames.instanceMax);
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
        localStorage.setItem(configNames.instanceMax, JSON.stringify(config));
    }

    setConfig(values: InstanceConfig) {
        this.config = values;
        this.saveToStorage(values);
    }

    clearConfig() {
        this.config = null;
        this.isConnected = false;
        localStorage.removeItem(configNames.instanceMax);
    }

    get isConfigured(): boolean {
        return this.config !== null;
    }
}

export const instanceStore = new InstanceStore();