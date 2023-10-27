const { LLMChain } = require("langchain/chains");
// const { ChatOpenAI } = require("langchain/chat_models/openai");
const { PromptTemplate } = require("langchain/prompts");
const { OpenAI } = require("langchain/llms/openai");
const { response } = require("express");

require("dotenv").config();

const router = require("express").Router();

// ２つのarrayをオブジェクトにする
function arraysToObject(array1, array2) {
  const result = {};

  for (let i = 0; i < array1.length; i++) {
    result[array1[i]] = array2[i];
  }

  return result;
}

//postで情報を受け取ってgptapiを実行しsendする
// bodyにmodel,templateFlagは必須。
// templateの時はtemplate, inputVariables,contentsをbodyに送る
// それ以外はquestionをbodyに送る
router.post("/performance", async (req, res) => {
  const model = req.body.model; //"gpt-3.5-turbo" or gpt-4
  const templateFlag = req.body.templateFlag; //テンプレートを使ってるか
  console.log("model template ok");
  // LLMの準備
  const llm = new OpenAI({ modelName: model, temperature: 0.5 });
  console.log("llm ok");
  if (templateFlag) {
    console.log("flag true");
    // プロンプトテンプレート使用時の処理
    const template = req.body.template; //保存したテンプレート
    const inputVariables = req.body.inputVariables; //使用する変数の数
    const contents = req.body.contents; //変数の中身の配列
    // const arrayLength = req.body.inputVariables.length;

    let prompt;
    let format;
    let submitQuestion;

    //inputVariablesからプロンプトテンプレートの設定する
    prompt = new PromptTemplate({
      inputVariables: inputVariables,
      template: template,
    });

    format = arraysToObject(inputVariables, contents);
    console.log(format);
    submitQuestion = await prompt.format(format);
    console.log(submitQuestion);

    try {
      // チェーンの準備
      const chain = new LLMChain({ llm: llm, prompt });

      // let gptResponse = await chain.call(format);
      let gptResponse = { text: "テンプレート送れてるよ" };
      console.log(gptResponse, submitQuestion);
      const responseData = {
        gptResponse: gptResponse,
        submitQuestion: submitQuestion,
      };
      res.send(responseData);
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  } else {
    console.log("flag false");
    // テンプレート未使用時の処理
    const question = req.body.question; // postされた質問
    console.log("question ok");
    try {
      // LLMの呼び出し
      // const response = await llm.call(question);
      let response = "送れてるよ";
      console.log(response);
      res.send(response);
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  }
});

// performance確認用
router.post("/confirmation", async (req, res) => {
  const model = req.body.model; //gpt-3.5-turbo or gpt-4
  const templateFlag = req.body.templateFlag; //テンプレートを使ってるか

  // LLMの準備
  const llm = new OpenAI({ model_name: model, temperature: 0.5 });

  if (templateFlag) {
    // プロンプトテンプレート使用時の処理
    const template = req.body.template; //保存したテンプレート
    const inputVariables = req.body.inputVariables; //使用する変数の数
    const contents = req.body.contents; //変数の中身の配列

    let prompt;

    //inputVariablesの数からプロンプトテンプレートの設定する
    switch (inputVariables) {
      case 1:
        prompt = new PromptTemplate({
          inputVariables: ["a"],
          template: template,
        });
        console.log(await prompt.format({ a: contents[0] }));
        console.log("1が選択されました。");
        break;
      case 2:
        prompt = new PromptTemplate({
          inputVariables: ["a", "b"],
          template: template,
        });
        console.log(await prompt.format({ a: contents[0], b: contents[1] }));
        console.log("2が選択されました。");
        break;
      case 3:
        prompt = new PromptTemplate({
          inputVariables: ["a", "b", "c"],
          template: template,
        });
        console.log(
          await prompt.format({
            a: contents[0],
            b: contents[1],
            c: contents[2],
          })
        );
        console.log("3が選択されました。");
        break;
      default:
        console.log("1、2、3以外が選択されました。");
    }
    try {
      // チェーンの準備
      const chain = new LLMChain({ llm: llm, prompt });

      const data = {
        send: "ok",
        model: model,
        flug: templateFlag,
        inputVariables: inputVariables,
        template: template,
        contents: contents,
      };

      res.send(data);
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  } else {
    // テンプレート未使用時の処理
    const question = req.body.question; // postされた質問

    try {
      const data = {
        send: "ok",
        model: model,
        flug: templateFlag,
        question: question,
      };
      console.log(data);
      res.send(data);
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  }
});

module.exports = router;
