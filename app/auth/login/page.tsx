"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Form, Container, Spinner, Alert } from "react-bootstrap";
import { login } from "../../action/auth.action";
import Link from "next/link";
import { getOrCreateDeviceId } from "@/app/types/deviceId";
import { Ilogin } from "@/app/types/auth";

export default function LoginPages() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Ngăn reload trang

    try {
      setLoading(true);
      const deviceId = getOrCreateDeviceId();

      const data: Ilogin = {
        username: e.username,
        password: e.password,
        deviceId: deviceId,
        rememberMe: e.remember || false,
      };

      const response = await login(data);

      if (response.ok) {
        alert("Đăng nhập thành công");
        router.push("/dashboard");
      } else {
        setError(response.message || "Đăng nhập không thành công");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      setError("Đã xảy ra lỗi trong quá trình đăng nhập");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4">Đăng nhập hệ thống</h3>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Tên đăng nhập</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRemember">
          <Form.Check
            type="checkbox"
            label="Ghi nhớ đăng nhập"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="w-100"
          disabled={loading}
        >
          {loading ? <Spinner size="sm" animation="border" /> : "Đăng nhập"}
        </Button>

        <Button
          variant="outline-secondary"
          className="w-100 mt-2"
          onClick={() => router.push("/auth/register")}
        >
          Tạo tài khoản
        </Button>
      </Form>

      <Link href="/dashboard" className="d-block text-center mt-3">
        Trang chủ
      </Link>
    </Container>
  );
}
