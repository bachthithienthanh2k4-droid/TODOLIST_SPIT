"use client";
import { useRouter } from "next/navigation";
import { Button, Container, Dropdown, Nav, Navbar } from "react-bootstrap";
function AppHeader() {
    const router = useRouter();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        router.push("/auth/login");
    };
    return (
        <Navbar bg="light" expand="lg" className="shadow-sm px-3">
            <Container fluid>
                <Navbar.Brand
                    href="/dashboard"
                    className="fw-bold text-primary"
                    style={{ fontSize: "1.3rem" }}
                >
                    To Do List SPIT
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-nav" />
                <Navbar.Collapse id="main-nav">
                    <Nav fill variant="tabs" defaultActiveKey="/home" className="me-auto">
                        <Nav.Item>
                            <Nav.Link href="/dashboard" className="px-3">Trang chủ</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/components/role" eventKey="link-1" className="px-3">Vai trò</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/components/token" eventKey="link-2" className="px-3">Token</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Dropdown className="px-3">
                                <Dropdown.Toggle >
                                    Công việc
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="/components/todo/CreateToDo">Tạo công việc</Dropdown.Item>
                                    <Dropdown.Item href="/components/todo/GetTodoMe">Công việc bản thân</Dropdown.Item>
                                    <Dropdown.Item href="/components/todo/GetTodoAll">Công việc User</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-4" className="px-3">Bình luận</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <Button variant="outline-danger" className="fw-semibold px-4" onClick={() => handleLogout()}>
                        Đăng xuất
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppHeader;
