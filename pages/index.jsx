import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Center from "../components/Center";
import { getSession } from "next-auth/react";
import Player from '../components/Player';

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Spotify 2.0</title>
      </Head>

      <div className="bg-black h-screen overflow-hidden">
        <main className="flex">
          {/* sidebar */}
          <Sidebar />
          {/* center */}
          <Center />
        </main>
        <div className="sticky bottom-0">
          {/* player */}
          <Player />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
