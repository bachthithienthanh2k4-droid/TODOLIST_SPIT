"use client";
import { createToken } from "@/app/action/token.action";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
interface ICreate {
    showModalCreate: boolean;
    setShowModalCreate: (value: boolean) => void;
}
export default function CreateTokenModal({ showModalCreate, setShowModalCreate }: ICreate) {
    const handleClose = () => {
        setId(0);
        setDeviceId("");
        setShowModalCreate(false);
    }
    const [id, setId] = React.useState<number>(0);
    const [deviceId, setDeviceId] = React.useState<string>("");

    const Save = async () => {
        const data: ITokenCreate = { id, deviceId };
        const result = await createToken(data);
        if (result.ok) {
            toast.success("Tạo token thành công");
            handleClose();
        } else if (result.status === 401){
            toast.error("Không có quyền thực hiện hành động này");
        }
        else if (result.status === 404) {
            toast.error("Thiết bị không tồn tại");
        } else {
            toast.error("Tạo token thất bại");
        }
    };

    return (
        <>
            <Modal
                show={showModalCreate}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Tạo Token</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formId">
                            <Form.Label>ID</Form.Label>
                            <Form.Control
                                type="number"
                                value={id}
                                onChange={(e) => setId(Number(e.target.value))}
                                placeholder="Nhập ID"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDeviceId">
                            <Form.Label>Device ID</Form.Label>
                            <Form.Control
                                type="text"
                                value={deviceId}
                                onChange={(e) => setDeviceId(e.target.value)}
                                placeholder="Nhập Device ID"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={Save}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
