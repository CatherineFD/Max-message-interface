export interface SendMessagePayload {
  chatId: string;
  message: string;
  typingTime?: number;
  quotedMessageId?: string;
}

export interface MessageResponse {
  idMessage: string
}

export type TextMessageData = {
  textMessage: string;
  isForwarded: boolean;
  forwardingScore: number;
}

export type QuotedMessage = {
  stanzaId: string;
  participant: string;
}

export type MessageData = {
  typeMessage:string;
  textMessageData: TextMessageData
}

export type InstanceData = {
  idInstance: number,
  wid: string,
  typeInstance: string,
}
export type SenderData = {
  chatId: string,
  chatName: string,
  chatType: string,
  sender: string,
  senderName: string,
  senderType: string,
  senderContactName: string,
  senderPhoneNumber: number,
}
export type ReceiveNotificationBody = {
  typeWebhook: string, 
  instanceData: InstanceData,
  timestamp: number,
  idMessage: string,
  senderData: SenderData,
  messageData: MessageData,
}

export type ReceiveNotification = {
  receiptId: number,
  body: ReceiveNotificationBody,
}
