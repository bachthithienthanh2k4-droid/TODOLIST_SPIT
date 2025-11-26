'use client';
import { createRole } from '@/app/action/role.action';
import { IRoleInfo } from '@/app/types/role';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

interface createRoleProps {
    showModal?: boolean;
    setShowModal?: (show: boolean) => void;
}

function CreateRole(props: createRoleProps) {
    const { showModal, setShowModal } = props;
    const handleClose = () => {
        if (setShowModal) {
            setShowModal(false);
        }
    };
    const handleShow = () => {
        if (setShowModal) {
            setShowModal(true);
        }
    };
    const [name, setName] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Xử lý logic lưu vai trò mới ở đây
        const data: IRoleInfo = {
            name: name,
            displayName: role
        }
        const result = await createRole(data);
        if (result.ok) {
            // Xử lý khi tạo vai trò thành công
            toast.success('Tạo vai trò thành công!');
            handleClose();
        }
        else if (result.status === 400) {
            toast.error('Vai trò đã tồn tại.');
            return;
        }
        else if (result.status === 401) {
            toast.error('Không được phép.');
            return;
        }

        console.log('Vai trò mới đã được tạo:', data);
        handleClose();
    };


    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal
                show={showModal}
                onHide={handleClose}
            >

                <Modal.Header closeButton>
                    <Modal.Title>Tạo Vai Trò</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Họ Tên</Form.Label>
                            <Form.Control type="text"
                                placeholder="Nhập Họ Tên"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="text" >
                            <Form.Label>Vai Trò</Form.Label>
                            <Form.Control as="textarea"
                                placeholder="Nhập Vai Trò"
                                rows={3}
                                value={role}
                                onChange={(e) => setRole(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Đóng</Button>
                    <Button variant="primary" onClick={handleSubmit}>Lưu lại</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CreateRole;