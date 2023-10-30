import axios from "axios";
import React from "react";
import styles from "./Delete.module.css";

export default function Delete({ deleteId }) {
  const deleteUrl = "http://127.0.0.1:3060/api/template/delete";

  const handleDeleteClick = (e, deleteId) => {
    if (
      typeof window !== "undefined" &&
      window.confirm("Are you sure you want to delete this item?")
    ) {
      // ブラウザ環境でのみ実行するコード
      deleteItem(deleteId);
    }
  };

  const deleteItem = async (deleteId) => {
    try {
      await axios.delete(`${deleteUrl}/${deleteId}`);
      console.log("id data delete");
      // Router.replace("/crud/read");
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* <div>{deleteId}</div> */}
      <button
        className={styles["delete-button"]}
        type="button"
        onClick={(e) => handleDeleteClick(e, deleteId)}
      >
        Delete
      </button>
    </div>
  );
}
