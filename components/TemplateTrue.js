import { useState } from "react";
import styles from "./TemplateTrue.module.css";

function TemplateTrue({
  selectedButton,
  templateFlag,
  setSubmitModel,
  setSubmitQuestion,
  updateQueryResult,
  selectedTemplate,
  selectedInputVariables,
}) {
  const [template, setTemplate] = useState(""); // templateの初期値は空文字列
  const [inputVariables, setInputVariables] = useState([]); // inputVariablesの初期値は空の配列
  const [contents, setContents] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);

  // コンテンツテキストの変更ハンドラー
  const handleContentChange = (index, newText) => {
    const updatedContents = [...contents];
    updatedContents[index] = newText;
    setContents(updatedContents);
  };

  const handleSubmit = async () => {
    setIsExecuting(true); // 実行中フラグを立てる

    setTimeout(async () => {
      // 質問を送信する
      const response = await sendQuestionToServer(
        selectedButton,
        templateFlag,
        selectedTemplate,
        selectedInputVariables,
        contents
      );

      let gptResponse;

      if (response.gptResponse) {
        // gptResponseに値がある場合の処理
        gptResponse = JSON.stringify(response.gptResponse.text);
      } else {
        // gptResponseがnullまたはundefinedの場合の処理
        gptResponse = "gptresponseはありません";
      }

      // const gptResponse = JSON.stringify(response.gptResponse.text);
      const submitQuestion = JSON.stringify(response.submitQuestion);
      // レスポンスをupdateQueryResultに格納する
      setSubmitModel(`選択： ${selectedButton}`);
      updateQueryResult(gptResponse);
      setSubmitQuestion(submitQuestion); //実際の質問を表示
      setIsExecuting(false); // 実行中フラグを解除する
    }, 1000); // 1秒（1000ミリ秒）の遅延を設定
  };

  const sendQuestionToServer = async (
    selectedButton,
    templateFlag,
    selectedTemplate,
    selectedInputVariables,
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
        template: selectedTemplate,
        inputVariables: selectedInputVariables,
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
      <div>
        <h2>選択されたデータ</h2>
        {/* <p>template: {selectedTemplate}</p>
        <p>inputVariables: {selectedInputVariables}</p> */}
        <div>
          <p>template: {selectedTemplate}</p>
          <p>inputVariables: {selectedInputVariables.join(", ")}</p>
          {Array.from({ length: selectedInputVariables.length }, (v, i) => (
            <textarea
              key={i}
              className={styles["question-input"]}
              placeholder={`変数の ${selectedInputVariables[i]} を入力してください`}
              value={contents[i]}
              onChange={(e) => handleContentChange(i, e.target.value)}
            ></textarea>
          ))}
        </div>
      </div>
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

export default TemplateTrue;
