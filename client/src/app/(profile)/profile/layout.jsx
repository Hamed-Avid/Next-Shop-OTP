import "@/app/globals.css";
import Providers from "@/app/providers";
import vazirFont from "@/constants/localFonts";
import { Toaster } from "react-hot-toast";
import SideBar from "./sideBar";
import Header from "@/app/Header";

export const metadata = {
  title: "user profile",
  description: "user profile",
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
          <div className="container xl:max-w-screen-xl grid grid-cols-6 bg-white h-screen">
            <div className="hidden md:block col-span-1 overflow-y-auto">
              <SideBar />
            </div>
            <div className="col-span-6 md:col-span-5 overflow-y-auto bg-gray-50 rounded-tr-3xl p-8">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
