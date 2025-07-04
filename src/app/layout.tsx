import "./globals.css";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import ClientLayout from "@/components/ClientLayout";
import AuthLayout from "@/components/AuthLayout";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "My App",
  description: "App with Sidebar",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = null;
  let isAuthenticated = false;

  try {
    session = await getServerSession(options);
    isAuthenticated = !!session;
  } catch (error) {
    console.error("Session error:", error);
    // If there's a session error, treat as not authenticated
    isAuthenticated = false;
  }

  return (
    <html lang="en">
      <body className="bg-[#1E1F28]">
        {isAuthenticated ? (
          <ClientLayout>
            {children}
            <Toaster />
          </ClientLayout>
        ) : (
          <AuthLayout>
            {children}
            <Toaster />
          </AuthLayout>
        )}
      </body>
    </html>
  );
}
