import { useState } from "react";
import TemplateFalse from "../components/TemplateFalse";
import TemplateTrue from "../components/TemplateTrue";
import styles from "../styles/Gpt.module.css";

const Gpt = () => {
  const [selectedButton, setSelectedButton] = useState("gpt-3.5-turbo");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
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

  const handleSubmit = () => {
    const responseText = `選択: ${selectedButton}, 質問: ${question}`;
    setResponse(responseText);
  };

  return (
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
        <TemplateFalse templateFlag={templateFlag} setQuestion={setQuestion} />
      )}
      <button className={styles["submit-button"]} onClick={handleSubmit}>
        質問を送信
      </button>
      <div className={styles.response}>
        <p>{response}</p>
      </div>
      <div>
        <p>queryResult: {queryResult}</p>
        <button onClick={() => updateQueryResult("New Query Result")}>
          Update queryResult
        </button>
      </div>
    </div>
  );
};

export default Gpt;
