import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLoginPage() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) redirect("/admin");
  } catch {
    /* env faltante en build local */
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <AdminLoginForm />
    </div>
  );
}
