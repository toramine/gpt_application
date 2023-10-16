import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Top Page</title>
        <meta name="description" content="gpt app top page" />
      </Head>
      <main>
        <div className={styles.content}>
          <div className={styles.wrapper}>
            <div className={styles.buttons}>
              <Link href="/generate">
                <button className={styles.generate_page}>GPT API</button>
              </Link>
              <Link href="/crud/read">
                <button className={styles.edit_page}>Template編集</button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
