const mongoose = require("mongoose");

// テンプレートスキーマを定義
const templateSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true, // このフィールドの値が一意であることを示す
  },
  template: String,
  inputVariables: Number,
  contents: [String],
});

// テンプレートモデルを作成
const Template = mongoose.model("Template", templateSchema);

module.exports = Template;
