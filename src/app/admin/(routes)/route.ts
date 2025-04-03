import { redirect } from "next/navigation";

export async function GET(request: Request) {
  //const { data: { session } } = await supabase.auth.getSession();

  
    redirect("/admin/dashboard");
  
}