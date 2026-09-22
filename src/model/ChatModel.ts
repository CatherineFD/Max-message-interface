import { makeAutoObservable } from "mobx";
import type { ChatInfo, ContactsList } from "../types/contact";
import type { MessageModel, MessageStatus } from "./MessageModel";

export class ChatModel {
    chatId: string;
    
    name: string = '';
    contactName: string = '';
    phoneNumber: number = 0;
    type: string = '';
    lastMessagePreview: string = '';
    
    avatar: string = '';
    lastSeen: string = '';
    phoneNumberTimestamp: number = 0;
    
    messagesMap: Map<string, MessageModel> = new Map();
    messagesOrder: string[] = [];
    isLoadingMessages: boolean = false;

    constructor(chatId: string) {
        this.chatId = chatId;
        makeAutoObservable(this);
    }

    get messages(): MessageModel[] {
        return this.messagesOrder
            .map(id => this.messagesMap.get(id))
            .filter((m): m is MessageModel => m !== undefined && !m.isDeleted);
    }

    addMessage(msg: MessageModel) {
        if (this.messagesMap.has(msg.id)) return;
        this.messagesMap.set(msg.id, msg);
        this.messagesOrder.push(msg.id);
    }

    updateMessageStatus(messageId: string, status: MessageStatus) {
        const msg = this.messagesMap.get(messageId);
        if (msg) msg.updateStatus(status);
    }

    updateFromList(data: ContactsList) {
        this.name = data.name;
        this.contactName = data.contactName;
        this.phoneNumber = data.phoneNumber;
        this.type = data.type;
    }

    updateFromInfo(data: ChatInfo) {
        this.name = data.name;
        this.avatar = data.avatar;
        this.contactName = data.contactName;
        this.lastSeen = data.lastSeen;
        this.phoneNumber = data.phoneNumber;
        this.phoneNumberTimestamp = data.phoneNumberTimestamp;
        this.type = data.chatType;
    }
}