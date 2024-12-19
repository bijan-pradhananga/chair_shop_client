import Navbar from "@/components/nav-bar";

export default function Layout({ children }) {
    return (
        <div >
                <Navbar/>
                {/* Main Content */}
                <main className="mx-auto max-w-2xl px-4 py-5 sm:px-6 lg:max-w-7xl lg:px-8">
                
                    {children}

                </main>
           
        </div>
    );
}
