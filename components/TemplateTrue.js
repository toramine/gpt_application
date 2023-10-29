import React, { useState } from "react";
import styles from "./TemplateTrue.module.css";

// テンプレートモデルのデータ
const testDatas = [
  {
    template: "1+1は{aa}",
    inputVariables: ["aa"],
  },
  {
    template: "1+2は{ai}{bi}",
    inputVariables: ["ai", "bi"],
  },
  {
    template: "1+3は{ai}{bi}{ci}",
    inputVariables: ["ai", "bi", "ci"],
  },
];

function TemplateTrue({
  selectedButton,
  templateFlag,
  setSubmitModel,
  setSubmitQuestion,
  updateQueryResult,
}) {
  const [template, setTemplate] = useState(""); // templateの初期値は空文字列
  const [inputVariables, setInputVariables] = useState([]); // inputVariablesの初期値は空の配列
  const [contents, setContents] = useState(["", "", ""]); // contentsの初期値は空文字列
  const [selectedData, setSelectedData] = useState();
  const [errorMessage, setErrorMessage] = useState(""); // エラーメッセージの状態を管理
  const [isExecuting, setIsExecuting] = useState(false);

  const handleDataSelect = (data) => {
    setSelectedData(data);
    setTemplate(data.template);
    setInputVariables(data.inputVariables);
  };

  // コンテンツテキストの変更ハンドラー
  const handleContentChange = (index, newText) => {
    const updatedContents = [...contents];
    updatedContents[index] = newText;
    setContents(updatedContents);
  };

  const handleSubmit = async () => {
    // バリデーション
    if (!selectedData) {
      // selectedData が空の場合、エラーメッセージを設定
      setErrorMessage("データが選択されていません。");
      return; // バリデーションエラー時は何もせずに処理を終了
    }
    // エラーメッセージをクリア
    setErrorMessage("");
    setIsExecuting(true); // 実行中フラグを立てる

    setTimeout(async () => {
      // 質問を送信する
      const response = await sendQuestionToServer(
        selectedButton,
        templateFlag,
        template,
        inputVariables,
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
      <div>
        <h2>選択可能なデータ</h2>
        <ul>
          {testDatas.map((data, index) => (
            <li key={index}>
              <button onClick={() => handleDataSelect(data)}>
                データ {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>選択されたデータ</h2>
        {selectedData ? (
          <div>
            <p>template: {selectedData.template}</p>
            <p>inputVariables: {selectedData.inputVariables.join(", ")}</p>
            {Array.from(
              { length: selectedData.inputVariables.length },
              (v, i) => (
                <textarea
                  key={i}
                  className={styles["question-input"]}
                  placeholder={`変数の ${inputVariables[i]} を入力してください`}
                  value={contents[i]}
                  onChange={(e) => handleContentChange(i, e.target.value)}
                ></textarea>
              )
            )}
          </div>
        ) : (
          <p>データが選択されていません。</p>
        )}
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
      <div>
        {errorMessage && (
          <p className={styles["error-message"]}>{errorMessage}</p>
        )}
      </div>
    </div>
  );
}

export default TemplateTrue;
