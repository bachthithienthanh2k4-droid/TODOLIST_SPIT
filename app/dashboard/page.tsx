import { getUsers} from "@/app/action/user.action";
import GetUsers from "./getuser";

export default async function Page() {

    const {data} = await getUsers();

  return <GetUsers userData={data} />;
}
