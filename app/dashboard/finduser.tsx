"use client";
import { Button, Form } from "react-bootstrap";
import { getUserById } from "../action/user.action";
import { useState } from "react";
import { IUser } from "../types/user";
import { toast } from "react-toastify";

interface FindProps {
    userData: IUser[];
    setFilteredUsers: (users: IUser[]) => void;
}

function FindUser({ userData, setFilteredUsers }: FindProps) {
    const [id, setId] = useState<number | "">("");

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Nếu xóa input → hiện lại toàn bộ user
        if (!id) {
            setFilteredUsers(userData);
            return;
        }

        try {
            const res = await getUserById(id);

            if (res.ok) {
                toast.success("Tìm kiếm thành công");
                setFilteredUsers([res.data]); // lấy 1 user
            } else if (res.status === 404) {
                toast.error("Người dùng không tồn tại");
                setFilteredUsers([]);
            } else if (res.status === 401) {
                toast.error("Không đủ quyền");
                setFilteredUsers([]);
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

export default FindUser;
