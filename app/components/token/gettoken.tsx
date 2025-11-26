"use client";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import CreateTokenModal from "./createtoken";
interface TokenData {
    data: ITokenInfo[];
}

export default function GetToken({ data }: TokenData) {
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    return (
        <>
            <Button onClick={() => {
                setShowModalCreate(true);
            }}>Tạo mới</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Họ tên</th>
                        <th>Vai trò</th>
                        <th>DeviceID</th>
                    </tr>
                </thead>
                <tbody>
                    {data
                        ?.slice()
                        .sort((a, b) => Number(a.sub) - Number(b.sub))
                        .map((item) => (
                            <tr key={item.sub}>
                                <td>{item.sub}</td>
                                <td>{item.userName}</td>
                                <td>{item.role}</td>
                                <td>{item.deviceId}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            <CreateTokenModal 
                showModalCreate={showModalCreate}
                setShowModalCreate={setShowModalCreate} />
        </>
    );
}
