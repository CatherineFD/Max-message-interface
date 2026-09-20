import { Navigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { instanceStore } from '../../stores/InstanceStore';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = observer(({ children }) => {
    const location = useLocation();

    if (!instanceStore.isConfigured) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
});