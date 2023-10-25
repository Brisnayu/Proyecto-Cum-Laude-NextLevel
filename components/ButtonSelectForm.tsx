import styles from "@/styles/stylesForm/buttonSelectForm.module.css";

const ButtonSelectForm = ({ title, functionElement, selectClass, type }: ButtonBackProps) => {
  return (
    <button type={type} onClick={functionElement} className={styles[selectClass]}>
      {title}
    </button>
  );
};

export type ButtonBackProps = {
  title: string;
  functionElement?: () => void;
  selectClass: string;
  type?: "submit" | "reset" | "button";
};

export default ButtonSelectForm;

// buttonUp: Sube un poco hacia arriba
// buttonRun: El color "corre" hacia un lado