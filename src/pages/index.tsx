import Head from "next/head";
import Products from '../components/products/page';
import styles from '../styles/Home.module.scss';
import Cart from "@/components/Cart/Cart";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Shopping cart application</title>
        <meta name="description" content="A simple shop built with Next.js and TypeScript" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        <Products />
      </main>
    </div>
  );
}
