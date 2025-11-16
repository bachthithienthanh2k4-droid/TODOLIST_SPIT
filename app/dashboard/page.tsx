import { getUsers } from "@/app/action/user.action";
import GetUsers from "./getuser";

export default async function Page() {
  const userData = await getUsers(); // userData là mảng
  return <GetUsers userData={userData} />;
}
