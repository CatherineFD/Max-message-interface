import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { LoginPage } from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import './App.css';
import { ProtectedRoute } from './components/route/ProtectedRoute';
import { useEffect } from 'react';
import { setPollingMessageHandler, startGreenApiPolling, stopGreenApiPolling } from './shared/services/greenApiPolling';
import { messagesStore } from './entities/messages/store';
import { MessageDirection, MessageModel } from './model/MessageModel';
import { activeChatStore } from './shared/stores/ActiveChatStore';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </ProtectedRoute>),
    children: [
      { index: true, element: <ChatPage />},
      { 
        path: ':chatId',
        element: <ChatPage />
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
      path: '*',
      element: <div>404 - Страница не найдена</div>,
  },
],
  {
    basename: '/Max-message-interface',
  });

function App() {
  useEffect(() => {
    const handleMessage: Parameters<typeof setPollingMessageHandler>[0] = (chatId, body) => {
      const text = body.messageData?.textMessageData?.textMessage || '';

      messagesStore.addMessage(chatId, {
        id: body.idMessage,
        text,
        type: 'text',
        status: 'delivered',
        direction: MessageDirection.incoming,
        timestamp: body.timestamp,
      });

      if (activeChatStore.currentChatId === chatId && activeChatStore.chat) {
        const newMsg = new MessageModel({
          id: body.idMessage,
          chatId,
          text,
          type: 'text',
          status: 'delivered',
          direction: MessageDirection.incoming,
        });
        activeChatStore.chat.addMessage(newMsg);
      }
    };

    setPollingMessageHandler(handleMessage);

    startGreenApiPolling();

    return () => {
      stopGreenApiPolling();
    };
  }, []);

  return <RouterProvider router={router} />;
}

export default App
