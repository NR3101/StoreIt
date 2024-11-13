import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect("/sign-in");

  return (
    <main className="flex h-screen">
      {/* Sidebar */}
      <Sidebar {...currentUser} />

      <section className="flex flex-1 h-full flex-col">
        {/* Mobile Nav */}
        <MobileNav {...currentUser} />

        {/* Header */}
        <Header userId={currentUser.$id} accountId={currentUser.accountId} />

        <div className="main-content">{children}</div>
      </section>

      {/* Toaster */}
      <Toaster />
    </main>
  );
}
