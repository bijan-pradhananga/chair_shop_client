export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
                <nav>navbar</nav>
                {/* Main Content */}
                <main className="flex-grow container mx-auto py-8 px-4">
                
                    {children}

                </main>
           
        </div>
    );
}
