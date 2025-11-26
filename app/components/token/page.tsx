import { getTokens } from "@/app/action/token.action";
import GetToken from "./gettoken";

export default async function TokenPage() {
    const {data} = await getTokens();
    return (
        <>
            <GetToken data = {data} />
        </>
    )
}