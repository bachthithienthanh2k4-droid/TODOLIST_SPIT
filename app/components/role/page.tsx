'use client';
import { Button } from "react-bootstrap";
import CreateRole from "./createrole";
import { useState } from "react";

export default function RolePage() {
    const [showModal, setShowModal] = useState<boolean>(false);
    return (
        <>
            <Button variant="primary" onClick={() => {
                setShowModal(true);
            }
            }>Tạo Vai Trò Mới</Button>
            <CreateRole showModal={showModal}
                setShowModal={setShowModal}
            />


        </>
    );
}