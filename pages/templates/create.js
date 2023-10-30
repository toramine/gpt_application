import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Topbar from "../../components/Topbar";

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

  const handleRemoveInput = (index) => {
    const newInputVariables = [...formData.inputVariables];
    newInputVariables.splice(index, 1);
    setFormData({ ...formData, inputVariables: newInputVariables });
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
    <div>
      <Topbar pageTitle="template create" />
      <h1>Template Create</h1>
      <form>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div>
          <label>Template:</label>
          <input
            type="text"
            name="template"
            value={formData.template}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div>
          {formData.inputVariables.join(", ")}
          {/* <label>Input Variables:</label>
          {formData.inputVariables.map((input, index) => (
            <div key={index}>
              <input
                type="text"
                name="inputVariables"
                value={input}
                onChange={(e) => handleInputChange(e)}
              />
              <button type="button" onClick={() => handleRemoveInput(index)}>
                Remove
              </button>
            </div>
          ))} */}
        </div>
        <button type="button" onClick={handleSubmit}>
          Create Template
        </button>
      </form>
      <Link href="/templates/read">
        <p>read Page</p>
      </Link>
    </div>
  );
};

export default TemplateCreate;
