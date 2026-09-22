export type ContactPayload = {
    count?: number
}

export type ContactsList = {
    chatId: string
    name: string
    contactName: string
    phoneNumber: number
    type: string
}

export type ChatInfo = {
    name: string;
    avatar: string;
    contactName: string;
    chatId: string;
    chatType: string;
    lastSeen: string;
    phoneNumber: number;
    phoneNumberTimestamp: number;
}

export type ChatPayload = {
    phoneNumber: number;
    force?: boolean;
}

export type ChatResponse = {
    exist: boolean;
    chatId: string;
    fromCache: boolean
}

export type ChatInfoPayload = {
    chatId: string;
}

export type CreateContactPayload = {
    chatId: string;
    firstName: string;
    lastName: string;
}

export type CreateContaceResponse = {
    addContact: boolean;
    messsage: string
}