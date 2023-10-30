const express = require("express");
const router = express.Router();
const Template = require("../schema");
const mongoose = require("mongoose");

require("dotenv").config();
const dbURI = process.env.DBURI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// 全てのテンプレートを取得
router.get("/read", async (req, res) => {
  await Template.find()
    .then((templates) => {
      console.log("テンプレート一覧:", templates);
      res.status(200).send(templates);
    })
    .catch((err) => {
      console.error("テンプレートの取得中にエラーが発生しました:", err);
      res
        .status(500)
        .send(`テンプレートの取得中にエラーが発生しました: ${err}`);
    });
});
// 特定の条件を持つテンプレートを取得
router.get("/readone/:id", async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      // テンプレートが見つからない場合の処理
      res.status(404).json({ error: "Template not found" });
      return;
    }

    res.status(200).json(template);
  } catch (err) {
    console.error("テンプレートの取得中にエラーが発生しました:", err);
    res.status(500).json({ error: "Error fetching template" });
  }
});
// POST:template
router.post("/create", async (req, res) => {
  const newTemplate = new Template({
    title: req.body.title,
    template: req.body.template,
    inputVariables: req.body.inputVariables,
  });

  await newTemplate
    .save()
    .then((template) => {
      console.log("新しいテンプレートが作成されました:", template);
      res.status(200).send(`新しいテンプレートが作成されました: ${template}`);
    })
    .catch((err) => {
      console.error("テンプレートの作成中にエラーが発生しました:", err);
      res
        .status(500)
        .send(`テンプレートの作成中にエラーが発生しました: ${err}`);
    });
});
// 特定のテンプレートを更新
router.put("/update/:id", async (req, res) => {
  const updateData = {
    title: req.body.title,
    template: req.body.template,
    inputVariables: req.body.inputVariables,
  };

  await Template.findByIdAndUpdate(
    req.params.id, // 更新対象のデータの _id
    updateData, // 更新データ
    { new: true } // 更新後のデータを取得するためのオプション
  )
    .then((updatedTemplate) => {
      console.log("更新されたテンプレート:", updatedTemplate);
      res.status(200).send(`更新されたテンプレート: ${updatedTemplate}`);
    })
    .catch((err) => {
      console.error("テンプレートの更新中にエラーが発生しました:", err);
      res
        .status(500)
        .send(`テンプレートの更新中にエラーが発生しました: ${err}`);
    });
});

// 特定のテンプレートを削除
router.delete("/delete/:id", async (req, res) => {
  const deleteId = req.params.id;

  try {
    // データベースからデータを削除
    const deletedTemplate = await Template.findByIdAndRemove(deleteId);

    if (deletedTemplate) {
      console.log("削除されたテンプレート:", deletedTemplate);
      res
        .status(200)
        .json({ message: "削除されたテンプレート", deletedTemplate });
    } else {
      res.status(404).json({ message: "データが見つかりません" });
    }
  } catch (err) {
    console.error("テンプレートの削除中にエラーが発生しました:", err);
    res.status(500).json({
      message: "テンプレートの削除中にエラーが発生しました",
      error: err,
    });
  }
});
module.exports = router;
