import styles from "@/styles/button.module.css";

const ButtonBack = ({ title, color }: ButtonBackProps) => {
  return (
    <button className={styles[color]}>{title}</button>
  );
};

export type ButtonBackProps = {
  title: string;
  color: string;
};

export default ButtonBack;