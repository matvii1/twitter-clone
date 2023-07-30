import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import Head from "next/head";
import { MainLayout } from "~/components/layouts";

import "~/styles/globals.css";
import { api } from "~/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Twitter clone</title>
        <meta
          name="description"
          content="Twitter clone made with Next.js, Prisma, and NextAuth.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
