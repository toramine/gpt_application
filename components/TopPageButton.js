import Link from "next/link";
import styles from "./TopPageButton.module.css";

const TopPageButton = ({ buttonText, linkHref }) => {
  return (
    <Link href={linkHref}>
      <button className={styles.enter_button}>{buttonText}</button>
    </Link>
  );
};

export default TopPageButton;
