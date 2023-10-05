const { LLMChain } = require("langchain/chains");
const { ChatOpenAI } = require("langchain/chat_models/openai");
const { PromptTemplate } = require("langchain/prompts");
const { OpenAI } = require("langchain/llms/openai");

require("dotenv").config();

const router = require("express").Router();

//postで情報を受け取ってgptapiを実行しsendする
// bodyにmodel,templateFlagは必須。
// templateの時はtemplate, inputVariables,inputObjectsをbodyに送る
// それ以外はquestionをbodyに送る
router.post("/performance", async (req, res) => {
  const model = req.body.model; //"gpt-3.5-turbo" or gpt-4
  const templateFlag = req.body.templateFlag; //テンプレートを使ってるか

  // LLMの準備
  const llm = new OpenAI({ modelName: model, temperature: 0.5 });

  if (templateFlag) {
    // プロンプトテンプレート使用時の処理
    const template = req.body.template; //保存したテンプレート
    const inputVariables = req.body.inputVariables; //使用する変数の配列
    const inputObjects = req.body.inputObjects; //変数と変数の中身

    try {
      // プロンプトテンプレートの設定
      const prompt = new PromptTemplate({
        inputVariables: inputVariables,
        template: template,
      });

      // チェーンの準備
      const chain = new LLMChain({ llm: llm, prompt });

      let response = await chain.call(inputObjects);

      console.log(response);
      res.send(response);
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  } else {
    // テンプレート未使用時の処理
    const question = req.body.question; // postされた質問

    try {
      // LLMの呼び出し
      const response = await llm.call(question);

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
    const inputVariables = req.body.inputVariables; //使用する変数の配列
    const inputObjects = req.body.inputObjects; //変数と変数の中身

    try {
      // プロンプトテンプレートの設定
      const prompt = new PromptTemplate({
        inputVariables: inputVariables,
        template: template,
      });

      // チェーンの準備
      const chain = new LLMChain({ llm: llm, prompt });

      const data = {
        send: "ok",
        model: model,
        flug: templateFlag,
        inputVariables: inputVariables,
        template: template,
        inputObjects: inputObjects,
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

      res.send(data);
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  }
});

module.exports = router;
