import { useState } from "react";
import TemplateFalse from "../components/TemplateFalse";
import TemplateTrue from "../components/TemplateTrue";
import Topbar from "../components/Topbar";
import styles from "../styles/Gpt.module.css";

require("dotenv").config();

const Gpt = () => {
  const [selectedButton, setSelectedButton] = useState("gpt-3.5-turbo");
  const [question, setQuestion] = useState("");
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

  const handleSubmit = async () => {
    setSubmitModel(`選択： ${selectedButton}`);
    setSubmitQuestion(question);
    // 質問を送信する
    const response = await sendQuestionToServer(
      selectedButton,
      question,
      templateFlag
    );
    // レスポンスをupdateQueryResultに格納する
    updateQueryResult(JSON.stringify(response));
  };

  const sendQuestionToServer = async (
    selectedButton,
    question,
    templateFlag
  ) => {
    // リクエストの設定
    const requestOptions = {
      method: "POST", // POSTリクエストを送信
      headers: {
        "Content-Type": "application/json", // JSON形式のデータを送信
      },
      body: JSON.stringify({
        model: selectedButton,
        templateFlag: templateFlag,
        question: question,
      }),
    };

    try {
      // リクエストを送信し、レスポンスを受け取る
      const response = await fetch(
        "http://127.0.0.1:3060/api/gpt/performance",
        requestOptions
      );
      if (!response.ok) {
        // エラーハンドリング
        throw new Error("質問の送信中にエラーが発生しました");
      }

      // JSON形式のレスポンスを解析
      // const data = await response.json();
      const data = response.text();
      console.log(data);
      return data; // レスポンスデータを返す
    } catch (error) {
      console.error(error);
      return { result: "エラーが発生しました" }; // エラーハンドリング
    }
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
            templateFlag={templateFlag}
            setQuestion={setQuestion}
          />
        )}
        <button className={styles["submit-button"]} onClick={handleSubmit}>
          質問を送信
        </button>
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
