import Header from "@/components/nav/Header";
import GlobalContextProvider from "@/context/GlobalContextProvider";

export default function MainLayout({ children }) {
    return (
        <main className="min-h-screen dark:bg-slate-900 dark:text-slate-400 text-black">
            <Header />
            <GlobalContextProvider>
                {children}
            </GlobalContextProvider>

        </main>
    );
}
