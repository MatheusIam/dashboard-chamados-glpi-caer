import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GLPI-MAPA",
  description: "Criado por Matheus, usando NextJS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={robotoSlab.className} style={{ background: "#273c75" }}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
