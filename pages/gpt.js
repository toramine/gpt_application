import axios from "axios";
import { useState } from "react";
import ReadData from "../components/ReadData";
import TemplateFalse from "../components/TemplateFalse";
import TemplateTrue from "../components/TemplateTrue";
import Topbar from "../components/Topbar";
import styles from "../styles/Gpt.module.css";

require("dotenv").config();

export async function getServerSideProps() {
  const templateReadURL = "http://127.0.0.1:3060/api/template/read"; // データを取得するAPIのURL

  try {
    const res = await axios.get(templateReadURL);
    const data = res.data;
    console.log(data);

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null, // データの取得に失敗した場合はnullを設定
      },
    };
  }
}

const Gpt = ({ data }) => {
  const [selectedButton, setSelectedButton] = useState("gpt-3.5-turbo");
  const [submitModel, setSubmitModel] = useState("");
  const [submitQuestion, setSubmitQuestion] = useState("");
  const [templateFlag, setTemplateFlag] = useState(false);
  const [queryResult, setQueryResult] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedInputVariables, setSelectedInputVariables] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const falseVisible = () => {
    setIsVisible(false);
  };

  const trueVisible = () => {
    setIsVisible(true);
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
        <button className={styles.visibleButton} onClick={trueVisible}>
          templateを選択する
        </button>
        <div className={isVisible ? styles.content : styles.hidden}>
          <ReadData
            data={data}
            setTemplateFlag={setTemplateFlag}
            setSelectedTemplate={setSelectedTemplate}
            setSelectedInputVariables={setSelectedInputVariables}
            selectedTemplate={selectedTemplate}
            selectedInputVariables={selectedInputVariables}
            falseVisible={falseVisible}
          />
        </div>
        {templateFlag ? (
          <TemplateTrue
            selectedButton={selectedButton}
            templateFlag={templateFlag}
            setSubmitModel={setSubmitModel}
            setSubmitQuestion={setSubmitQuestion}
            updateQueryResult={updateQueryResult}
            selectedTemplate={selectedTemplate}
            selectedInputVariables={selectedInputVariables}
          />
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
