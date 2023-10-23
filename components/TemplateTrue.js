import React, { useState } from "react";
import styles from "./TemplateTrue.module.css";

// テンプレートモデルのデータ
const testDatas = [
  {
    template: "1+1は{a}",
    inputVariables: 1,
  },
  {
    template: "1+2は{a}{b}",
    inputVariables: 2,
  },
  {
    template: "1+3は{a}{b}{c}",
    inputVariables: 3,
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
  const [inputVariables, setInputVariables] = useState(); // inputVariablesの初期値は空の配列
  const [contents, setContents] = useState(["", "", ""]); // contentsの初期値は空文字列
  const [selectedData, setSelectedData] = useState();

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
    // 選択したテンプレートの値をセット
    // 質問を送信する
    const response = await sendQuestionToServer(
      selectedButton,
      templateFlag,
      template,
      inputVariables,
      contents
    );
    const gptResponse = JSON.stringify(response.gptResponse.text);
    const submitQuestion = JSON.stringify(response.submitQuestion);
    // レスポンスをupdateQueryResultに格納する
    setSubmitModel(`選択： ${selectedButton}`);
    updateQueryResult(gptResponse);
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
            <p>inputVariables: {selectedData.inputVariables}</p>
            {Array.from({ length: selectedData.inputVariables }, (v, i) => (
              <textarea
                key={i}
                className={styles["question-input"]}
                placeholder={`変数の ${i + 1} 番目を入力してください`}
                value={contents[i]}
                onChange={(e) => handleContentChange(i, e.target.value)}
              ></textarea>
            ))}
          </div>
        ) : (
          <p>データが選択されていません。</p>
        )}
      </div>

      <button className={styles["submit-button"]} onClick={handleSubmit}>
        質問を送信
      </button>
    </div>
  );
}

export default TemplateTrue;
