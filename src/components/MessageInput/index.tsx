import { useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Input, Button, Space } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import styles from './MessageInput.module.css';

interface MessageInputProps {
    onSendMessage: (message: string) => void;
    loading: boolean;
    placeholder?: string;
}

const MessageInput = observer(function MessageInput(props: MessageInputProps) {
    const {
        onSendMessage,
        loading, 
        placeholder = 'Введите сообщение...',
    } = props;
  const [text, setText] = useState('');

  const handleSend = useCallback(() => {
    if (!text.trim()) return;
    onSendMessage(text);
    setText('');
  }, [onSendMessage, setText, text]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Space.Compact className={styles.container}>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={loading}
        size="large"
      />
      <Button
        type="primary"
        icon={<SendOutlined />}
        onClick={handleSend}
        loading={loading}
        size="large"
      >
        Отправить
      </Button>
    </Space.Compact>
  );
})

export default MessageInput;