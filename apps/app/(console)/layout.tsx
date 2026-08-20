import type { Metadata } from "next";
import ConsoleLayoutClient from "./console-layout-client";

export const metadata: Metadata = {
  title: "Console",
};

export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ConsoleLayoutClient>{children}</ConsoleLayoutClient>;
}
