import { action, makeObservable, observable } from 'mobx';
import type { ContactsList } from '../../types/api/contact';
import { chatApi } from '../../api/chatApi';
import { BaseStore } from '../BaseStore';
import { isApiError } from '../../types/error';

export class ContactStore extends BaseStore {
    contactsList: ContactsList[] = [];
    currentChatId: string = '';

    constructor() {
        super();
        this.fetch();

        makeObservable(this, {
            contactsList: observable,
            currentChatId: observable,
            setContactsList: action,
            setCurrentChatId: action,
        });
    }

    init() {

    }

    setContactsList(value: ContactsList[]) {
        this.contactsList = [...value];
    }

    setCurrentChatId(value: string) {
        console.log(value);
        this.currentChatId = value;
    }

    async fetch() {
        try {
            const list = await chatApi.getContacts({});
            this.setContactsList(list);
        } catch (e: unknown) {
            if (isApiError(e)) {
                const status = e.status || 0; 
            
                const message = e.message || 'Неизвестная ошибка сети';
                
                this.setError(status, message);
            } else if (e instanceof Error) {
                this.setError(500, e.message);
            } else {
                this.setError(500, 'Произошла непредвиденная ошибка');
            }
        }
    }

    async checkAccount(phone: number) {
        console.log(phone);
        try {
            const data = await chatApi.checkAccountByPhone({phoneNumber: phone});
             console.log(data);
            if(data.exist) {
                this.setCurrentChatId(data.chatId);
                this.getInfoContact();
            }
        } catch {
            console.log('error');
        }
    }

    async getInfoContact() {
        try {
            const data = chatApi.getChatInfo({chatId: this.currentChatId});

            console.log(data);
        } catch {
            console.log('error');
        }
    }

    clear(): void {
        this.contactsList = [];
    }
}