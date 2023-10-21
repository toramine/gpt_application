import { useState } from "react";
import TemplateFalse from "../components/TemplateFalse";
import TemplateTrue from "../components/TemplateTrue";
import Topbar from "../components/Topbar";
import styles from "../styles/Gpt.module.css";

require("dotenv").config();

const Gpt = () => {
  const [selectedButton, setSelectedButton] = useState("gpt-3.5-turbo");
  const [submitModel, setSubmitModel] = useState("");
  const [submitQuestion, setSubmitQuestion] = useState("");
  const [templateFlag, setTemplateFlag] = useState(false);
  const [queryResult, setQueryResult] = useState("");

  const toggleTemplateFlag = () => {
    setTemplateFlag(!templateFlag); // true と false を切り替える
  };

  const updateQueryResult = (newResult) => {
    setQueryResult(newResult);
  };

  const handleButtonClick = (buttonText) => {
    setSelectedButton(buttonText);
  };

  return (
    <div>
      <div className={styles.topbar}>
        <Topbar pageTitle="GPT API" />
      </div>
      <div className={styles.container}>
        <h1>質問フォーム</h1>
        <div className={styles.buttons}>
          <button
            className={`${styles.button} ${
              selectedButton === "gpt-3.5-turbo" ? styles.selected : ""
            }`}
            onClick={() => handleButtonClick("gpt-3.5-turbo")}
          >
            gpt-3.5-turbo
          </button>
          <button
            className={`${styles.button} ${
              selectedButton === "gpt-4" ? styles.selected : ""
            }`}
            onClick={() => handleButtonClick("gpt-4")}
          >
            gpt-4
          </button>
        </div>
        <p>templateFlag: {templateFlag ? "true" : "false"}</p>
        <button onClick={toggleTemplateFlag}>Toggle templateFlag</button>
        {templateFlag ? (
          <TemplateTrue />
        ) : (
          <TemplateFalse
            selectedButton={selectedButton}
            templateFlag={templateFlag}
            setSubmitModel={setSubmitModel}
            setSubmitQuestion={setSubmitQuestion}
            updateQueryResult={updateQueryResult}
          />
        )}

        <div>
          <p>{submitModel}</p>
          <p>質問：</p>
          <div className={styles["result-display"]}>
            <p>{submitQuestion}</p>
          </div>
          <p>回答：</p>
          <div className={styles["result-display"]}>
            <p>{queryResult}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gpt;
