import styles from "@/styles/components/buttonSelect.module.css";

const ButtonSelect = ({
  title,
  functionElement,
  selectClass,
  selectSecondClass,
  type,
}: ButtonBackProps) => {

  const secondClass = selectSecondClass ? styles[selectSecondClass] : "";

  return (
    <button
      type={type}
      onClick={functionElement}
      className={`${styles[selectClass]} ${secondClass}`}
    >
      {title}
    </button>
  );
};

export type ButtonBackProps = {
  title: string;
  functionElement?: (() => void) | ((e: React.MouseEvent) => void);
  selectClass: string;
  selectSecondClass?: string | undefined;
  type?: "submit" | "reset" | "button";
};

export default ButtonSelect;

// buttonUp: Sube un poco hacia arriba
// buttonRun: El color "corre" hacia un lado
