import { GetTodoMe } from '@/app/action/todo.action';
import Table from 'react-bootstrap/Table';

export default async function GetToDoMe() {
    const data = await GetTodoMe();

    const todos = Array.isArray(data)
        ? [...data].sort((a, b) => Number(a.id) - Number(b.id))
        : [];

    return (
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
                {todos.length > 0 ? (
                    todos.map((todo) => (
                        <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.title}</td>
                            <td>{todo.description}</td>
                            <td>{todo.dueDate}</td>
                            <td>{todo.status}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} className="text-center text-muted">
                            Không có dữ liệu.
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}
