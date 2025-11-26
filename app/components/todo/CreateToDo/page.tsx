'use client';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { TodoCreate } from '@/app/action/todo.action';
import { toast } from 'react-toastify';
import { ItodoCreate } from '@/app/types/todo';

export default function CreateToDo() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const todoData: ItodoCreate = {
            title: title,
            description: desc,
            dueDate: date,
            status: status
        };
        if (todoData.title === "" || todoData.description === "" || todoData.dueDate === "" || todoData.status === "") {
            toast.error("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        const result = await TodoCreate(todoData);
        if (result.ok) {
            toast.success("Tạo công việc thành công!");
        } else if (result.status === 401) {
            toast.error("Không được phép!");
        }

    };

    return (
        <div className="d-flex justify-content-center mt-4">
            <Card style={{ width: "480px", padding: "20px", borderRadius: "16px", boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}>
                <h4 className="text-center mb-4" style={{ fontWeight: 600 }}>Tạo Công Việc</h4>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Chủ đề</Form.Label>
                        <Form.Control
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Nhập chủ đề"
                            className="rounded-3"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Mô tả</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={desc}
                            onChange={e => setDesc(e.target.value)}
                            placeholder="Nhập mô tả"
                            className="rounded-3"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Hạn ngày</Form.Label>
                        <Form.Control
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            className="rounded-3"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Trạng thái</Form.Label>
                        <Form.Control
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                            placeholder="Nhập trạng thái (Ví dụ: đang làm, hoàn thành...)"
                            className="rounded-3"
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        className="w-100 py-2 rounded-3"
                        style={{ fontWeight: 600, fontSize: "16px" }}
                        onClick={() => { handleSubmit }}
                    >
                        Tạo
                    </Button>
                </Form>
            </Card>
        </div>
    );
}
