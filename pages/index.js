import Head from "next/head";
import Image from "next/image";
import TopPageButton from "../components/TopPageButton";
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
            <div className={styles.logo}>
              {/* ロゴまたは画像を表示する部分 */}
              <Image
                src="/top-image.png"
                alt="Top image"
                width={700} // ピクセル単位の幅を指定
                height={400} // 高さを自動調整
              />
            </div>
            <div className={styles.buttons}>
              {/* TopPageBottonコンポーネントを使ってボタンを追加 */}
              <TopPageButton buttonText="GPT API" linkHref="/generate" />
              <TopPageButton buttonText="Template編集" linkHref="/crud/read" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
