import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Topbar from "../../../components/Topbar";
import styles from "../../../styles/templates/Edit.module.css";

const TemplateEdit = () => {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    _id: id,
    title: "",
    template: "",
    inputVariables: [],
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:3060/api/template/readone/${id}`)
        .then((response) => {
          const { title, template, inputVariables } = response.data;
          setFormData({ ...formData, title, template, inputVariables });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "template") {
      const inputVariables = value.match(/\{(.*?)\}/g) || [];
      const cleanInputVariables = inputVariables.map((variable) =>
        variable.replace(/\{|\}/g, "")
      );

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        inputVariables: cleanInputVariables,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleUpdate = () => {
    const { _id, title, template, inputVariables } = formData;
    axios
      .put(`http://127.0.0.1:3060/api/template/update/${_id}`, {
        title,
        template,
        inputVariables,
      })
      .then((response) => {
        console.log("Data updated successfully:", response.data);
        // データの更新が成功したら適切なリダイレクト
        router.push("/templates/read"); // リダイレクト
      })
      .catch((error) => {
        console.error("Data update failed:", error);
        // エラーメッセージを表示
        alert("データの更新に失敗しました。エラー: " + error.message);
      });
  };

  return (
    <div className={styles.content}>
      <div className={styles.wrapper}>
        <Topbar pageTitle={styles.createTitle} />
        <h1 className={styles.createTitle}>Template Edit</h1>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Title"
            className={styles.inputField}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Template:</label>
          <textarea
            name="template"
            value={formData.template}
            onChange={handleInputChange}
            placeholder="Template"
            className={styles.textareaField}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>inputVariables:</label>
          {formData.inputVariables.join(", ")}
        </div>
        <button className={styles.button} onClick={handleUpdate}>
          Update
        </button>
        <Link href="/templates/read">
          <p className={styles.readLink}>Read Pageへ</p>
        </Link>
      </div>
    </div>
  );
};

export default TemplateEdit;
