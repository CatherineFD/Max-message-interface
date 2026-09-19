import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { List, Spin, Typography } from 'antd';
import type { Message } from '../../types/api/message';
import type { ChatStore } from '../../stores/error/ChatStore';

interface MessageListProps {
    chatStore: ChatStore;
}

const MessageList = observer(function MessageList(props: MessageListProps) {
    const { chatStore } = props;
  const listEndRef = useRef<HTMLDivElement>(null);

  // Авто-скролл вниз при новом сообщении
  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatStore.messages.length]);

  if (chatStore.messages.length === 0 && !chatStore.isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: 40, color: '#999' }}>
        Нет сообщений. Напишите первое!
      </div>
    );
  }

  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      <List
        dataSource={chatStore.messages}
        renderItem={(msg: Message) => (
          <div
            style={{
              display: 'flex',
              justifyContent: msg.direction === 'outgoing' ? 'flex-end' : 'flex-start',
              marginBottom: 8,
            }}
          >
            <div
              style={{
                maxWidth: '70%',
                padding: '8px 12px',
                borderRadius: 12,
                background: msg.direction === 'outgoing' ? '#1677ff' : '#f0f0f0',
                color: msg.direction === 'outgoing' ? '#fff' : '#000',
              }}
            >
              <Typography.Text style={{ color: 'inherit' }}>{msg.text}</Typography.Text>
              <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        )}
      />
      <div ref={listEndRef} />
      {chatStore.isLoading && <Spin style={{ display: 'block', margin: '16px auto' }} />}
    </div>
  );
})

export default MessageList;