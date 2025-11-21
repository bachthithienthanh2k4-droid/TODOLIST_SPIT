import { Button, Modal } from "react-bootstrap";
import { IUser } from "../types/user";
import { useEffect, useState } from "react";
import { deleteUserById } from "../action/user.action";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { useRouter } from "next/navigation";

interface IDelete {
    ShowModalDelete: boolean;
    setShowModalDelete: (value: boolean) => void;
    user: IUser | null;
    setUser: (value: IUser | null) => void;
}
function DeleteUser (users: IDelete) {
    const { ShowModalDelete, setShowModalDelete, user,setUser} = users;
    const [id, setId] = useState<number>();
    const HandleCloseDelete = () => {
        setShowModalDelete(false);
        setId(undefined);
    };
    const router = useRouter();
     useEffect(() => {
        if (user) setId(user.id);
    }, [user]);
    const HandleDelete = async () => {
        if (!id) return;
        try {
            const res = await deleteUserById(id);
            if (res.ok || res.data.statusCode === 200) {
                console.log("Xóa thành công");
                toast.success("Xóa người dùng thành công");
                mutate(`${process.env.NEXT_PUBLIC_API_WAN}/users`);
                router.refresh();
                HandleCloseDelete();
            }
            else if (res.data.statusCode === 401){
                toast.error("Bạn không có quyền xóa người dùng này");
            }
            else if (res.data.statusCode === 404){
                toast.error("Người dùng không tồn tại");
            }
            else if (res.data.statusCode === 403){
                toast.error("Không thể xóa chính mình");
            }
            else {
                toast.error("Xóa người dùng thất bại");
            }
        } catch (error) {
            console.error(error);
            toast.error("Có lỗi xảy ra khi xóa người dùng");
        }        
    }
    return  (
      <Modal
        show={ShowModalDelete}
        onHide={HandleCloseDelete}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Xóa người dùng</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Bạn có chắc chắn muốn xóa người này không?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => HandleCloseDelete()}>Không</Button>
          <Button variant="primary" onClick={() => HandleDelete()}>Có</Button>
        </Modal.Footer>
      </Modal>
  );
}
export default DeleteUser;