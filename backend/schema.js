const mongoose = require("mongoose");

// テンプレートスキーマを定義
const templateSchema = new mongoose.Schema({
  title: String,
  template: String,
  inputVariables: Number,
  contents: [String],
});

// テンプレートモデルを作成
const Template = mongoose.model("Template", templateSchema);

module.exports = Template;
