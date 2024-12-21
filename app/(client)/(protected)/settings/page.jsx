import { auth, signOut } from "@/auth";
const Page = async () => {
    const session = await auth();
 
    return (
        <div>
            {JSON.stringify(session)}
            <br />
            <form action={
                async () => {
                    "use server";
                    await signOut({redirectTo:'/auth/login'});
                }
            }>

                <button type="submit">
                    Logout
                </button>
            </form>
        </div>
    )
}

export default Page