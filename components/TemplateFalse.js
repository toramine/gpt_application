import React from "react";
import styles from "./TemplateFalse.module.css";

function TemplateFalse({ question, setQuestion }) {
  return (
    <input
      type="text"
      className={styles["question-input"]}
      placeholder="質問を入力してください"
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
    />
  );
}

export default TemplateFalse;
