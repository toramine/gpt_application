import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Topbar from "../../../components/Topbar";

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
    <div>
      <Topbar pageTitle="template create" />
      <h1>Template Edit</h1>
      <div>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Title"
        />
      </div>
      <div>
        <input
          type="text"
          name="template"
          value={formData.template}
          onChange={handleInputChange}
          placeholder="Template"
        />
      </div>
      <div>
        {formData.inputVariables.join(", ")}
        {/* <input
          type="text"
          name="inputVariables"
          value={formData.inputVariables.join(", ")}
          onChange={handleInputChange}
          placeholder="Input Variables (comma-separated)"
        /> */}
      </div>
      <button onClick={handleUpdate}>Update</button>
      <Link href="/templates/read">
        <p>read Page</p>
      </Link>
    </div>
  );
};

export default TemplateEdit;
