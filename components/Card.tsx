import { useState } from "react";
import styles from "@/styles/card.module.css";

export type CardProps = {
  titleCuriousFact: string;
  textCuriousFact: string;
  numberCuriousFact: number;
};

const Card = ({ titleCuriousFact, textCuriousFact, numberCuriousFact }: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered ? (
        <div className={styles.dynamicContent}>
          <h3>{titleCuriousFact}</h3>
          <p>{textCuriousFact}</p>
        </div>
      ) : (
        <h2>Curiosidad Nº {numberCuriousFact}</h2>
      )}
    </div>
  );
};

export default Card;
