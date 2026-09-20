import React, { useEffect } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { LockOutlined, KeyOutlined } from '@ant-design/icons';

interface InstanceSettingsFormProps {
    initialValues?: {
        idInstance: string;
        apiTokenInstance: string;
    };
    onSubmit: (values: { idInstance: string; apiTokenInstance: string }) => void;
    isLoading?: boolean;
}

export const InstanceSettingsForm: React.FC<InstanceSettingsFormProps> = ({
    initialValues,
    onSubmit,
    isLoading = false,
}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        }
    }, [initialValues, form]);

    const onFinish = (values: { idInstance: string; apiTokenInstance: string }) => {
        onSubmit(values);
        message.success('Настройки сохранены');
    };

    const handleTestConnection = () => {
        form.validateFields().then(values => {
            console.log('Тест подключения с:', values);
            message.info('Тестирование подключения...');
        });
    };

    return (
        <Card 
            title="Настройки подключения к Max API" 
            style={{ maxWidth: 600, margin: '0 auto' }}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={initialValues}
                requiredMark={false}
            >
                <Form.Item
                    label="ID Instance"
                    name="idInstance"
                    rules={[
                        { required: true, message: 'Пожалуйста, введите ID Instance' },
                        { 
                            pattern: /^\d+$/, 
                            message: 'ID Instance должен содержать только цифры' 
                        },
                        { 
                            min: 5, 
                            message: 'ID Instance должен содержать минимум 5 символов' 
                        }
                    ]}
                    tooltip="Уникальный идентификатор вашего экземпляра WhatsApp"
                >
                    <Input
                        prefix={<KeyOutlined />}
                        placeholder="Например: 110100"
                        size="large"
                    />
                </Form.Item>

                <Form.Item
                    label="API Token Instance"
                    name="apiTokenInstance"
                    rules={[
                        { required: true, message: 'Пожалуйста, введите API Token' },
                        { 
                            min: 20, 
                            message: 'API Token должен содержать минимум 20 символов' 
                        }
                    ]}
                    tooltip="Секретный токен для авторизации API запросов"
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Например: d75b3a66374942c5b3c019c698abc2067e151558acbd4ecd"
                        size="large"
                    />
                </Form.Item>

                <Form.Item style={{ marginBottom: '8px' }}>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        loading={isLoading}
                        size="large"
                        block
                    >
                        Сохранить настройки
                    </Button>
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }}>
                    <Button 
                        onClick={handleTestConnection}
                        size="large"
                        block
                    >
                        Тестировать подключение
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};