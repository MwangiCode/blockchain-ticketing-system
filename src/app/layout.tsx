import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

export const metadata = {
  title: "My App",
  description: "Authentication example with context",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
