export interface Message {
  id: string;
  text: string;
  author: string;
  timestamp: number;
  direction: 'incoming' | 'outgoing';
}

export interface SendMessagePayload {
  chatId: string;
  message: string;
  typingTime?: number;
  quotedMessageId?: string;
}