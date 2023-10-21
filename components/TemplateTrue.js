import React, { useState } from "react";
import styles from "./TemplateTrue.module.css";

function TemplateTrue({
  selectedButton,
  templateFlag,
  setSubmitModel,
  setSubmitQuestion,
  updateQueryResult,
}) {
  const [template, setTemplate] = useState(""); // templateの初期値は空文字列
  const [inputVariables, setInputVariables] = useState(); // inputVariablesの初期値は空の配列
  const [contents, setContents] = useState([]); // contentsの初期値は空文字列

  const handleSubmit = async () => {
    // 質問を送信する
    const response = await sendQuestionToServer(
      selectedButton,
      templateFlag,
      template,
      inputVariables,
      contents
    );
    const gptResponse = response.gptResponse.text();
    const submitQuestion = response.submitQuestion.text();
    // レスポンスをupdateQueryResultに格納する
    setSubmitModel(`選択： ${selectedButton}`);
    updateQueryResult(JSON.stringify(gptResponse));
    setSubmitQuestion(submitQuestion); //実際の質問を表示
  };

  const sendQuestionToServer = async (
    selectedButton,
    templateFlag,
    template,
    inputVariables,
    contents
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
        template: template,
        inputVariables: inputVariables,
        contents: contents,
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
      const data = await response.json();
      // console.log(data);
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
      <button className={styles["submit-button"]} onClick={handleSubmit}>
        質問を送信
      </button>
    </div>
  );
}

export default TemplateTrue;
