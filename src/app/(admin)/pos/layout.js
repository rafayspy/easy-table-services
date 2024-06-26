import GlobalContextProvider from "@/context/GlobalContextProvider";

export default function dashboardLayout({ children }) {
    return (
        <GlobalContextProvider>
            <div className="min-h-screen dark:bg-slate-900">
                {children}
            </div>
        </GlobalContextProvider>
    );
}