import Head from "next/head";
import { GetServerSideProps } from "next";
import styles from "../styles/bouquet.module.css";

interface Emoji {
  id: number;
  emoji: string;
}

interface HomeProps {
  emojis: Emoji[];
}

export default function Home({ emojis }: HomeProps): JSX.Element {
  return (
    <>
      <Head>
        <title>bouquet</title>
        <meta name="description" content="All emojis from the database" />
      </Head>
      <div className="bg-black text-white p-3 text-center">
        RSS only for now
      </div>
    </>
  );
}
