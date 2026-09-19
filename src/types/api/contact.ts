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