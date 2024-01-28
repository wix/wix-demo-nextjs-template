import "./globals.css";
import type { Viewport } from 'next'
import { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";

import Footer from "@/app/components/Layout/Footer";
import Header from "@/app/components/Layout/Header";
import { LoginModal } from "@/app/components/LoginModal/LoginModal";
import { SidebarUI } from "@/app/components/Sidebar/SidebarUI";
import { LayoutProvider } from "@/app/components/LayoutProvider/LayoutProvider";

export const metadata: Metadata = {
  title: {
    default: "Create Wix Demo Site",
    template: "%s | Create Wix Demo Site",
  },
  icons: {
    icon: "https://www.wix.com/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
}

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
      <>
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
      </>
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
