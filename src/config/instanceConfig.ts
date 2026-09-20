export interface InstanceConfig {
    idInstance: string;
    apiTokenInstance: string;
}

export const getInstanceConfig = (): InstanceConfig | null => {
    const stored = localStorage.getItem('instance_config');
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('Ошибка парсинга конфига из localStorage', e);
        }
    }

    return null;
};

export const setInstanceConfig = (config: InstanceConfig) => {
    localStorage.setItem('instance_config', JSON.stringify(config));
};