import styles from "@/styles/stylesForm/buttonSelectForm.module.css";

const ButtonSelectForm = ({ title, functionElement }: ButtonBackProps) => {
  return (
    <button onClick={functionElement} className={styles.button}>
      {title}
    </button>
  );
};

export type ButtonBackProps = {
  title: string;
  functionElement: () => void;
};

export default ButtonSelectForm;
