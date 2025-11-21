"use client";
import { Button, Table } from "react-bootstrap";
import { IUser } from "../types/user";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import UpdateUser from "./updateuser";
import { useState } from "react";
import DeleteUser from "./deleteuser";

interface DashboardProps {
    userData: IUser[];
}

export default function GetUsers({ userData }: DashboardProps) {
    const [ShowModalUpdate, setShowModalUpdate] =  useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [ShowModalDelete, setShowModalDelete] =  useState<boolean>(false);
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
                    {userData?.slice().sort((a, b) => Number(a.id) - Number(b.id)).map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.fullname}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className="p-2 rounded hover:bg-gray-100">
                                    <FaEye size={20} className="text-blue-600" />
                                </button>

                                <button className="p-2 rounded hover:bg-gray-100"
                                    onClick={() => {
                                        setSelectedUser(user);
                                        setShowModalUpdate(true);
                                    }}>
                                    <FaEdit size={20} className="text-yellow-500" />
                                </button>

                                <button className="p-2 rounded hover:bg-gray-100"
                                    onClick={() => {
                                        setSelectedUser(user);
                                        setShowModalDelete(true);
                                    }}>
                                    <FaTrash size={20} className="text-red-600" />
                                </button>


                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <UpdateUser 
                ShowModalUpdate={ShowModalUpdate}
                setShowModalUpdate={setShowModalUpdate}
                user={selectedUser}
                setUser={setSelectedUser} 
             />
             <DeleteUser 
                ShowModalDelete={ShowModalDelete}
                setShowModalDelete={setShowModalDelete}
                user={selectedUser}
                setUser={setSelectedUser}
                 />
        </>
    );
}
