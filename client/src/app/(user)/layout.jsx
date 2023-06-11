import "../globals.css";
import vazirFont from "@/constants/localFonts";
import Header from "../Header";
import { Toaster } from "react-hot-toast";
import Providers from "../providers";

export const metadata = {
  title: "Next Shop App",
  description: "next shop frontend develop by hamed avid",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body
        suppressHydrationWarning={true}
        className={`${vazirFont.variable} font-sans container bg-gray-50 min-w-[320px] max-w-[1440px]`}
      >
        <Providers>
          <Toaster />
          <Header />
          <div className="overflow-hidden xl:max-w-screen-2xl">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
