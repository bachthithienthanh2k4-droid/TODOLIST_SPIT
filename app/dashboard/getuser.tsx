"use client";
import { Table } from "react-bootstrap";
import { IUser } from "../types/user";

interface DashboardProps {
    userData: IUser[];
}

export default function GetUsers({ userData }: DashboardProps) {
    return (
        <>
            <div>Trang chủ</div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>UserName</th>
                        <th>FullName</th>
                        <th>RoleName</th>
                    </tr>
                </thead>
                <tbody>
                    {userData?.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.fullName}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
