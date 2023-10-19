import Link from "next/link";
import React from "react";
import styles from "./Topbar.module.css";

export default function TopBar({ pageTitle }) {
  return (
    <div className={styles.topbar}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Link href="/">
            <div className={styles.text}>トップページへ</div>
          </Link>
          <h1 className={styles.text}>{pageTitle}</h1>
          <div className={styles.text}>詳細</div>
        </div>
      </div>
    </div>
  );
}
