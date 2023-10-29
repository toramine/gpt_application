import React, { useState } from "react";
import styles from "./TemplateFalse.module.css";

function TemplateFalse({
  selectedButton,
  templateFlag,
  setSubmitModel,
  setSubmitQuestion,
  updateQueryResult,
}) {
  const [question, setQuestion] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);

  const handleSubmit = async () => {
    setSubmitModel(`選択： ${selectedButton}`);
    setSubmitQuestion(question);
    setIsExecuting(true); // 実行中フラグを立てる

    setTimeout(async () => {
      // 質問を送信する
      const response = await sendQuestionToServer(
        selectedButton,
        question,
        templateFlag
      );
      // レスポンスをupdateQueryResultに格納する
      updateQueryResult(JSON.stringify(response));
      setIsExecuting(false); // 実行中フラグを解除する
    }, 1000); // 1秒（1000ミリ秒）の遅延を設定
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
      <textarea
        className={styles["question-input"]}
        placeholder="質問を入力してください"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      ></textarea>
      <div className={styles["submit-button-area"]}>
        {isExecuting ? (
          <p className={styles["executing-text"]}>実行中...</p>
        ) : (
          <button className={styles["submit-button"]} onClick={handleSubmit}>
            質問を送信
          </button>
        )}
      </div>
    </div>
  );
}

export default TemplateFalse;
