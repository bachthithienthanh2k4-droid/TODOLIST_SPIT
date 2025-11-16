"use client";
import { Register } from '@/app/action/auth.action';
import { IRegister } from '@/app/types/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            setLoading(true);
            const data: IRegister = { username, password };
            const result = await Register(data);

            if (result.ok) {
                router.push('/auth/login');
            } else {
                alert(result.message || 'Đăng ký không thành công');
            }
        } catch (error) {
            console.error('Lỗi đăng ký:', error);
            alert('Đã xảy ra lỗi trong quá trình đăng ký');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-5" style={{ maxWidth: "400px" }}>
            <h3 className="text-center mb-4">Đăng ký tài khoản</h3>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập tên đăng nhập"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                    {loading ? "Đang đăng ký..." : "Đăng ký"}
                </Button>
            </Form>
        </Container>
    );
}
