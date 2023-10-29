import axios from "axios";
import Link from "next/link";
import Delete from "../../components/Delete";
import Topbar from "../../components/Topbar";
import styles from "../../styles/templates/Read.module.css";

export async function getServerSideProps() {
  const templateReadURL = "http://127.0.0.1:3060/api/template/read"; // データを取得するAPIのURL

  try {
    const res = await axios.get(templateReadURL);
    const data = res.data;
    console.log(data);

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null, // データの取得に失敗した場合はnullを設定
      },
    };
  }
}

const TemplateRead = ({ data }) => {
  return (
    <div>
      <div className={styles.topbar}>
        <Topbar pageTitle="template read" />
      </div>
      <div className={styles["centered-container"]}>
        <h1 className={styles.pageTitle}>Template Read</h1>
        <Link href="/templates/create">
          <p className={styles.createLink}>Create Page</p>
        </Link>
      </div>
      <ul className={styles.itemList}>
        {data.map((item, index) => (
          <li key={index} className={styles.item}>
            <div className={styles.itemContent}>
              <div className={styles.title}>Title: {item.title}</div>
              <div className={styles.template}>Template: {item.template}</div>
              <Link href="/templates/edit">
                <button className={styles.editButton}>Edit</button>
              </Link>
              <Delete deleteId={item._id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemplateRead;
