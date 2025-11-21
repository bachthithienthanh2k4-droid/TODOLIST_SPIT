"use client";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { IUser } from "../types/user";
import { updateUserById } from "../action/user.action";
import { mutate } from "swr";
import { toast } from "react-toastify";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

interface IUpdate {
    ShowModalUpdate: boolean;
    setShowModalUpdate: (value: boolean) => void;
    user: IUser | null;
    setUser: (value: IUser | null) => void;
}

function UpdateUser({ ShowModalUpdate, setShowModalUpdate, user, setUser }: IUpdate) {
    const [id, setId] = useState<number>();
    const [fullName, setFullName] = useState<string>("");
    const router = useRouter();
    useEffect(() => {
        if (user) {
            console.log("Selected user for update:", user.id, user.fullname);
            setId(user.id);
            setFullName(user.fullname || "");
        }
    }, [user]);

    const HandleCloseUpdate = () => {
        setShowModalUpdate(false);
        setFullName("");
        setId(undefined);
    };

    const HandleUpdate = async () => {
        if (!id) return;

        try {
            const res = await updateUserById(id, fullName);
            console.log("Update response:", res);
            if (res.ok || res.data.statusCode === 200) {
                toast.success("Chỉnh sửa thành công");
                mutate(`${process.env.NEXT_PUBLIC_API_WAN}/users`); 
                router.refresh();
                HandleCloseUpdate();
            } else {
                toast.error("Chỉnh sửa thất bại");
            }

        } catch (error) {
            console.error(error);
            toast.error("Có lỗi xảy ra khi cập nhật người dùng");
        }
    };

    return (
        <Modal show={ShowModalUpdate} onHide={HandleCloseUpdate}>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa thông tin người dùng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={HandleCloseUpdate}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={() => HandleUpdate()}>
                    Lưu
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateUser;
