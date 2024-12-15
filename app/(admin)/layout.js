'use client';
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar"
export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <SidebarProvider>
                <AppSidebar/>
                {/* Main Content */}
                <main className="flex-grow container mx-auto py-8 px-4">
                
                    {children}

                </main>
            </SidebarProvider>
        </div>
    );
}
