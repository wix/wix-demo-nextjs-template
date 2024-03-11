import "./globals.css";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import { SidebarUI } from "./components/Sidebar/SidebarUI";
import { LoginModal } from "./components/LoginModal/LoginModal";
import { Metadata } from "next";
import { LayoutProvider } from "@/app/components/LayoutProvider/LayoutProvider";
import NextTopLoader from "nextjs-toploader";
import {ClientProvider} from '@/app/components/Provider/Providers';

export const metadata: Metadata = {
  title: {
    default: "Create Wix Demo Site",
    template: "%s | Create Wix Demo Site",
  },
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "https://www.wix.com/favicon.ico",
  },
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body className="bg-site">
    <link rel="icon" href="https://www.wix.com/favicon.ico" />
    {process.env.NEXT_PUBLIC_WIX_CLIENT_ID ? (
      <ClientProvider>
        <NextTopLoader shadow={false} showSpinner={false} />
        <Header />
        <main className="bg-site min-h-[600px]">
          <LayoutProvider>{children}</LayoutProvider>
        </main>
        <SidebarUI />
        <LoginModal />
        <div className="mt-3 sm:mt-9">
          <Footer />
        </div>
      </ClientProvider>
    ) : (
      <div className="bg-site min-h-[600px] max-w-5xl mx-auto p-5">
        Page not available. Please add an environment variable called
        NEXT_PUBLIC_WIX_CLIENT_ID, containing the client ID, to your
        deployment provider.
      </div>
    )}
    </body>
    </html>
  );
}
