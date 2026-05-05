"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ADMIN_EMAIL = "ms.harshita.vats@gmail.com";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();

  if (!user) return null;

  if (user.emailAddresses[0].emailAddress !== ADMIN_EMAIL) {
    redirect("/");
  }

  return <div className="p-5">{children}</div>;
}