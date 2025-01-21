import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user) {
      router.replace("/login");
    } else if ((session.user as { role?: string }).role === "ADMIN") {
      router.replace("/admin");
    } else {
      router.replace("/profile");
    }
  }, [session, status, router]);

  return (
    <div className="redirecting">
      <p>Redirecting...</p>
    </div>
  );
}
