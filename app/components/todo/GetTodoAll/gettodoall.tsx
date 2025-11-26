"use client";
import { GetTodoUser } from '@/app/action/todo.action';
import Table from 'react-bootstrap/Table';
import FindTodo from './findID';
import { useState } from 'react';
import { ItodoGet } from '@/app/types/todo';
interface ItodoGetProps {
    userData: ItodoGet[];
}
export default function GetToDoAll(userData: ItodoGetProps) {


    const [filteredTodos, setFilteredTodos] = useState<ItodoGet[]>(userData.userData);
    return (
        <>
            <FindTodo
                userData={userData.userData}
                setFilteredTodo={setFilteredTodos}
            />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tiêu đề</th>
                        <th>Mô tả</th>
                        <th>Hạn Ngày</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTodos?.slice().sort((a, b) => Number(a.id) - Number(b.id)).map((todo) =>
                        <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.title}</td>
                            <td>{todo.description}</td>
                            <td>{todo.dueDate}</td>
                            <td>{todo.status}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    );
}
