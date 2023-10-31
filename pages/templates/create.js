import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/templates/Create.module.css";

const TemplateCreate = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    template: "",
    inputVariables: [""],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "template") {
      const inputVariables = value.match(/\{(.*?)\}/g) || [];
      const cleanInputVariables = inputVariables.map((variable) =>
        variable.replace(/\{|\}/g, "")
      );
      setFormData({
        ...formData,
        [name]: value,
        inputVariables: cleanInputVariables,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://127.0.0.1:3060/api/template/create", formData);
      // alert("Template created successfully");
      router.push("/templates/read"); // リダイレクト
    } catch (error) {
      console.error(error);
      alert("Error creating template");
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.wrapper}>
        <h1 className={styles.pageTitle}>Template Create</h1>
        <form>
          <div className={styles.formGroup}>
            <label className={styles.label}>Title:</label>
            <input
              type="text"
              name="title"
              className={styles.input}
              value={formData.title}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Template:</label>
            <textarea
              name="template"
              className={styles.input}
              value={formData.template}
              onChange={(e) => handleInputChange(e)}
            ></textarea>
          </div>
          <div className={styles.inputVariables}>
            <label className={styles.label}>inputVariables:</label>
            {formData.inputVariables.join(", ")}
          </div>
          <button
            className={styles.button}
            type="button"
            onClick={handleSubmit}
          >
            Create Template
          </button>
        </form>
        <Link href="/templates/read">
          <p className={styles.link}>read Pageへ</p>
        </Link>
      </div>
    </div>
  );
};

export default TemplateCreate;
