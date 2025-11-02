// web/src/app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";

// Se quiser os providers no app todo, pode manter aqui também:
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {/* Providers globais (opcional manter aqui) */}
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
