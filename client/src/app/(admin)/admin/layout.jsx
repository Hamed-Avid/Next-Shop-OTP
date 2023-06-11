import "@/app/globals.css";
import Providers from "@/app/providers";
import vazirFont from "@/constants/localFonts";
import { Toaster } from "react-hot-toast";
import SideBar from "./SideBar";
import Header from "@/app/Header";

export const metadata = {
  title: "admin profile",
  description: "admin profile",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body
        suppressHydrationWarning={true}
        className={`${vazirFont.variable} font-sans container min-w-[320px] max-w-[1440px]`}
      >
        <Providers>
          <Toaster />
          <Header />
          <div className="xl:max-w-screen-2xl grid grid-cols-6 bg-white h-screen">
            <div className="hidden md:block col-span-1">
              <SideBar />
            </div>
            <div className="col-span-6 md:col-span-5 bg-gray-50 scrollbar rounded-tr-3xl p-3 md:p-8">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
