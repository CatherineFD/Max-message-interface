export interface InstanceConfig {
    idInstance: string;
    apiTokenInstance: string;
}

export const enum configNames {
    instanceMax = 'instance_config_max',
}

export const getInstanceConfig = (): InstanceConfig | null => {
    const stored = localStorage.getItem(configNames.instanceMax);
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
    localStorage.setItem(configNames.instanceMax, JSON.stringify(config));
};