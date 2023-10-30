import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Delete from "../../components/Delete";
import Topbar from "../../components/Topbar";
import styles from "../../styles/templates/Read.module.css";

const TemplateRead = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const templateReadURL = "http://127.0.0.1:3060/api/template/read"; // データを取得するAPIのURL

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(templateReadURL);
        const responseData = response.data;
        console.log(response);
        setData(responseData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <div className={styles.topbar}>
        <Topbar pageTitle="template read" />
      </div>
      <div className={styles["centered-container"]}>
        <h1 className={styles.pageTitle}>Template Read</h1>
        <Link href="/templates/create">
          <p className={styles.createLink}>Create template</p>
        </Link>
      </div>
      {/* <div>{data}</div> */}
      <ul className={styles.itemList}>
        {data.map((item, index) => (
          <li key={index} className={styles.item}>
            <div className={styles.itemContent}>
              <div className={styles.title}>Title: {item.title}</div>
              <div className={styles.template}>Template: {item.template}</div>
              <Link href={`/templates/edit/${item._id}`}>
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
