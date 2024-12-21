import { auth } from "@/auth";
import FooterComponent from "@/components/footer-component";
import Navbar from "@/components/nav-bar";
import { SessionProvider } from "next-auth/react";

export default async function Layout({ children }) {
    const session = await auth();

    return (
        <div >
            <SessionProvider session={session}>
                <Navbar />
                {/* Main Content */}
                <main className="mx-auto max-w-2xl px-4 py-5 sm:px-6 lg:max-w-7xl lg:px-8">
                    {children}
                </main>
                <FooterComponent />
            </SessionProvider>
        </div>
    );
}
