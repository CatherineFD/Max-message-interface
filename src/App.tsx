import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout><Outlet /></MainLayout>,
    children: [
      { index: true, element: <ChatPage />},
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App
