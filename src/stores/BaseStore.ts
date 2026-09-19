import { makeObservable, observable, action } from "mobx";
import type { ErrorState } from '../types/error';

export abstract class BaseStore {
    isLoading: boolean;
    error: ErrorState | null;

    constructor() {
        this.isLoading = false;
        this.error = null;

        makeObservable(this, {
            isLoading: observable,
            error: observable,
            setLoading: action,
            setError: action,
        });
    }

    setLoading(value: boolean) {
        this.isLoading = value;
    }

    setError(status: number, text: string) {
        this.error = {
            status,
            text,
        }
    }

    abstract fetch(): Promise<void>;
    abstract clear(): void;
}