import styles from "@/styles/pages/form/stylesForm/updateDesigner.module.css";
import { DesignerExtended } from "@/types";
import Image from "next/image";

const CardUpdateDesigner = ({
  individualDesigner,
}: CardUpdateDesignerProps) => {
  return (
    <div className={styles.cardInfo}>
      <span>Actualizar</span>
      <div className={styles.cardAvatar}>
        <Image
          className={styles.imageAvatar}
          src={individualDesigner.image}
          alt={individualDesigner.name}
          width={150}
          height={150}
          priority
        />
        <div>
          <h2>
            Nombre: <span>{individualDesigner.name}</span>
          </h2>
          <h2>
            Apellido: <span>{individualDesigner.surname}</span>
          </h2>
          <h2>
            Nacionalidad: <span>{individualDesigner.nationality}</span>
          </h2>
        </div>
      </div>
      <div className={styles.cardTitle}>
        <h2>
          Resumen: <span>{individualDesigner.summary}</span>
        </h2>
      </div>
      <div className={styles.cardSubtitle}>
        <h3>Diseños:</h3>
        <div className={styles.containerCards}>
          {individualDesigner.design.map((design) => (
            <div className={styles.containerCard} key={design._id}>
              <Image
                src={design.images[0]}
                alt={design.name}
                width={180}
                height={180}
                priority
              />
              <h5>{design.name}</h5>
              <p>{design.year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export type CardUpdateDesignerProps = {
  individualDesigner: DesignerExtended;
};

export default CardUpdateDesigner;
