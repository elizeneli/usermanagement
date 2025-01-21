import { SessionProvider } from "next-auth/react";
import { withTRPC } from "@trpc/next";
import superjson from "superjson";
import type { AppRouter } from "../server/trpc/router";
import { httpBatchLink } from "@trpc/client";
import { AppProps } from "next/app";
import { Session } from "next-auth";
import "../styles/styles.css";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default withTRPC<AppRouter>({
  config() {
    const url =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/trpc";

    return {
      links: [
        httpBatchLink({
          url,
        }),
      ],
      transformer: superjson,
    };
  },
  ssr: false,
})(MyApp);
