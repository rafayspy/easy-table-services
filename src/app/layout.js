import { Jost } from "next/font/google";
import "./globals.css";
import GlobalContextProvider from "@/context/GlobalContextProvider";

const jost = Jost({ subsets: ["latin"] });

export const metadata = {
  title: "Easy Table Service",
  description: "Simple table service system.",
};

export default function RootLayout({ children }) {
  return (

    <html lang="en"
      suppressHydrationWarning
    // data-theme="night"
    >
      <body className={jost.className}>{children}
        <footer>
          <p className="text-center dark:bg-slate-900 py-3">Copyright © 2024 | Developed & Maintained By Easy Table Services.</p>
        </footer>
      </body>
    </html>
  );
}
