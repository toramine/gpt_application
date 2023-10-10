const express = require("express");
const router = express.Router();
const Template = require("..schema");

require("dotenv").config();
const dbURI = process.env.DBURI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// 全てのテンプレートを取得
router.get("/read", async (req, res) => {
  await Template.find()
  .then(templates => {
    console.log('テンプレート一覧:', templates);
    res.send('テンプレート一覧:', templates);
  })
  .catch(err => {
    console.error('テンプレートの取得中にエラーが発生しました:', err);
    res.send('テンプレートの取得中にエラーが発生しました:', err);
  });
},

// 特定の条件を持つテンプレートを取得
router.get("/readone", async (req, res) => {
  await Template.find({ _id:  req.body._id})
  .then(template => {
    console.log('条件に合致するテンプレート:', template);
    res.send('条件に合致するテンプレート:', template);
  })
  .catch(err => {
    console.error('テンプレートの取得中にエラーが発生しました:', err);
    res.send('テンプレートの取得中にエラーが発生しました:', err);
  });
},
// POST:template
router.post("/create", async (req, res) => {
  const newTemplate = new Template({
    title: req.body.title,
    template: req.body.template,
    inputVariables: req.body.inputVariables,
    contents: req.body.contents
  });

  await newTemplate.save()
    .then(template => {
      console.log('新しいテンプレートが作成されました:', template);
      res.send('新しいテンプレートが作成されました:', template);
    })
    .catch(err => {
      console.error('テンプレートの作成中にエラーが発生しました:', err);
      res.send('テンプレートの作成中にエラーが発生しました:', err);
    });

},
// 特定のテンプレートを更新
router.put("/update", async (req, res) => {
  await Template.findOneAndUpdate(
    { _id: req.body._id},
    { title: req.body.newTitle},
    { template: req.body.newTemplate },
    { inputVariables: req.body.newInputVariables },
    { contents: req.body.newContents },
    { new: true } // 更新後のデータを取得するためのオプション
  )
    .then(updatedTemplate => {
      console.log('更新されたテンプレート:', updatedTemplate);
      res.send('更新されたテンプレート:', updatedTemplate);
    })
    .catch(err => {
      console.error('テンプレートの更新中にエラーが発生しました:', err);
      res.send('テンプレートの更新中にエラーが発生しました:', err);
    });

  },
// 特定のテンプレートを削除
router.delete("/delete", async (req, res) => {
  Template.findOneAndDelete({ _id: req.body._id })
  .then(deletedTemplate => {
    console.log('削除されたテンプレート:', deletedTemplate);
    res.send('削除されたテンプレート:', deletedTemplate);
  })
  .catch(err => {
    console.error('テンプレートの削除中にエラーが発生しました:', err);
    res.send('テンプレートの削除中にエラーが発生しました:', err);
  });
},

module.exports = router;
