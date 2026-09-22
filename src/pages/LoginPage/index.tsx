import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate, useLocation } from 'react-router-dom';
import { Typography } from 'antd';
import { instanceStore } from '../../shared/stores/InstanceStore';
import { InstanceSettingsForm } from '../../components/InstanceSettingsForm';

export const LoginPage: React.FC = observer(() => {
    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state)?.from?.pathname || '/';

    const handleSubmit = async (values: { idInstance: string; apiTokenInstance: string }) => {
        instanceStore.setConfig(values);
        navigate(from, { replace: true });
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f0f2f5',
            padding: '20px',
        }}>
            <div style={{ width: '100%', maxWidth: 500 }}>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <Typography.Title level={2}>
                        Max Messenger
                    </Typography.Title>
                    <Typography.Text type="secondary">
                        Введите данные вашего экземпляра для продолжения
                    </Typography.Text>
                </div>

                <InstanceSettingsForm
                    onSubmit={handleSubmit}
                    isLoading={instanceStore.isLoading}
                />
            </div>
        </div>
    );
});