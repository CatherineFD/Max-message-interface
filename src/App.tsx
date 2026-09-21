import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { LoginPage } from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import './App.css';
import { ProtectedRoute } from './components/route/ProtectedRoute';

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
  return <RouterProvider router={router} />;
}

export default App
