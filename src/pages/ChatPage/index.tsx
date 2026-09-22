import { observer } from 'mobx-react-lite';

import styles from './ChatPage.module.css';
import { ChatsList } from '../../features/chats-list';
import { Chat } from '../../features/chat';


const ChatPage = observer(() => {

  return (
    <>
        <div className={
            styles.container
        }>
            <ChatsList/>

            <Chat/>
        </div>
    </>
  );
});

export default ChatPage;