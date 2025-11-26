"use client";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { ItodoGet } from "@/app/types/todo";
import { GetByIDToDo } from "@/app/action/todo.action";

interface FindProps {
    userData: ItodoGet[];
    setFilteredTodo: (users: ItodoGet[]) => void;
}

function FindTodo({ userData, setFilteredTodo }: FindProps) {
    const [id, setId] = useState<number | "">("");

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!id) {
            setFilteredTodo(userData);
            return;
        }

        try {
            const res = await GetByIDToDo(id);

            if (res.ok) {
                toast.success("Tìm kiếm thành công");
                setFilteredTodo([res.data]);
            } else if (res.status === 400) {
                toast.error("Công việc không tồn tại");
                setFilteredTodo([]);
            } else if (res.status === 401) {
                toast.error("Không được phép");
                setFilteredTodo([]);
            }
        } catch (error) {
            console.error("Lỗi:", error);
            toast.error("Lỗi khi tìm kiếm");
        }
    };

    return (
        <Form
            className="d-flex"
            style={{ justifyContent: "flex-end", width: "500px", margin: "10px" }}
            onSubmit={handleSearch}
        >
            <Form.Control
                type="number"
                placeholder="Tìm kiếm theo ID..."
                className="me-2"
                value={id}
                onChange={(e) => setId(e.target.value ? Number(e.target.value) : "")}
            />
            <Button type="submit" variant="primary">
                Tìm
            </Button>
        </Form>
    );
}

export default FindTodo;
