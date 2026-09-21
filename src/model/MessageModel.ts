import { makeAutoObservable } from "mobx";

export type MessageStatus = "sending" | "sent" | "delivered" | "read" | "error";
export type MessageType = "text" | "image" | "voice" | "file" | "system";

export class MessageModel {
    id: string;
    chatId: string;
    
    // Контент
    text: string = "";
    type: MessageType = "text";
    
    // Статус доставки
    status: MessageStatus = "sending";
    
    // Дополнительные фичи
    replyToId?: string;
    editedAt?: number;
    isDeleted: boolean = false;

    constructor(data: Partial<MessageModel> & { id: string; chatId: string; }) {
        Object.assign(this, data);
        this.id = data.id;
        this.chatId = data.chatId;

        makeAutoObservable(this, {}, { autoBind: true });
    }

    // Методы обновления состояния
    updateStatus(status: MessageStatus) {
        this.status = status;
    }

    updateText(newText: string) {
        this.text = newText;
        this.editedAt = Date.now();
    }

    markAsDeleted() {
        this.isDeleted = true;
        this.text = "";
    }
}