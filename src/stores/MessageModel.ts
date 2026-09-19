import { makeAutoObservable } from "mobx";

export type MessageStatus = "sending" | "sent" | "delivered" | "read" | "error";
export type MessageType = "text" | "image" | "voice" | "file" | "system";

export class MessageModel {
    id: string;
    chatId: string;
    
    // Контент
    text: string = "";
    type: MessageType = "text";
    mediaUrl?: string;
    fileName?: string;
    duration?: number;
    
    // Метаданные
    senderId: string;
    timestamp: number;
    isOutgoing?: boolean;
    
    // Статус доставки (важно для UX!)
    status: MessageStatus = "sending";
    
    // Дополнительные фичи
    replyToId?: string;
    editedAt?: number;       // если сообщение редактировали
    isDeleted: boolean = false;

    constructor(data: Partial<MessageModel> & { id: string; chatId: string; senderId: string; timestamp: number }) {
        Object.assign(this, data);
        this.id = data.id;
        this.chatId = data.chatId;
        this.senderId = data.senderId;
        this.timestamp = data.timestamp;
        this.isOutgoing = data.isOutgoing;

        makeAutoObservable(this, {}, { autoBind: true });
    }

    // Геттер для форматированного времени
    get formattedTime(): string {
        const date = new Date(this.timestamp);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    get formattedDate(): string {
        const date = new Date(this.timestamp);
        const today = new Date();
        const isToday = date.toDateString() === today.toDateString();
        if (isToday) return "Сегодня";
        
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        if (date.toDateString() === yesterday.toDateString()) return "Вчера";
        
        return date.toLocaleDateString();
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
        this.mediaUrl = undefined;
    }
}