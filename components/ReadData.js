import React from "react";
import styles from "./ReadData.module.css"; // スタイルシートのインポート

const ReadData = ({
  data,
  setTemplateFlag,
  setSelectedTemplate,
  selectedTemplate,
  setSelectedInputVariables,
  selectedInputVariables,
  falseVisible,
}) => {
  const handleApplyClick = (item) => {
    setTemplateFlag(true);
    setSelectedTemplate(item.template);
    setSelectedInputVariables(item.inputVariables);
    falseVisible();
    console.log(selectedTemplate);
    console.log(selectedInputVariables);
  };

  const handleCancelSelection = () => {
    setTemplateFlag(false);
    falseVisible();
  };

  return (
    <div className={styles.content}>
      <button onClick={handleCancelSelection}>テンプレートを選択しない</button>
      <ul className={styles.itemList}>
        {data.map((item, index) => (
          <li key={index} className={styles.item}>
            <div className={styles.itemContent}>
              <div className={styles.itemContentLeft}>
                <div className={styles.title}>Title: {item.title}</div>
                <div className={styles.template}>Template: {item.template}</div>
                <div className={styles.template}>
                  inputVariables: {item.inputVariables.join(", ")}
                </div>
              </div>

              <div className={styles.itemContentRight}>
                <button
                  className={styles.applyButton}
                  onClick={() => handleApplyClick(item)}
                >
                  適用する
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReadData;
