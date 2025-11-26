import { GetTodoUser } from "@/app/action/todo.action";
import GetToDoAll from "./gettodoall";

export default async function GetTodoAllPage() {
    const data = await GetTodoUser();
    return (
        <GetToDoAll userData={data.data} />
    )
}