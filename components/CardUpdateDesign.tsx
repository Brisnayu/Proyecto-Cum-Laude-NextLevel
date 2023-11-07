import styles from "@/styles/components/CardUpdateDesign.module.css";
import { DesignExtended } from "@/types";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

const CardUpdateDesign = ({ individualDesign }: CardUpdateProps) => {
  if (!individualDesign) {
    return <div>No hay datos</div>;
  }

  return (
    <div className={styles.containerUpdate}>
      <span>Actualización</span>
      <div className={styles.containerText}>
        <h3>
          Nombre del diseño: <span>{individualDesign.name}</span>
        </h3>
        <h3>
          Año del lanzamiento: <span>{individualDesign.year}</span>
        </h3>
        <h3>
          Categoría: <span>{individualDesign.category}</span>
        </h3>
      </div>

      <div className={styles.containerText}>
        <h3>
          Resumen: <span>{individualDesign.summary}</span>
        </h3>
      </div>

      {individualDesign.curiosities && (
        <div className={styles.containerList}>
          <ul>
            <h3>Lista de curiosidades:</h3>
          </ul>
          {individualDesign.curiosities.map((curiosity) => (
            <li key={uuidv4()}>
              &bull; {curiosity.title}: <span>{curiosity.description}</span>
            </li>
          ))}
        </div>
      )}

      {individualDesign.images && (
        <div className={styles.containerImages}>
          <h3>Imágenes:</h3>
          <div className={styles.images}>
            {individualDesign.images.map((image) => (
              <Image
                key={uuidv4()}
                className={styles.modalImage}
                src={image}
                alt="Preview"
                width={200}
                height={200}
                priority
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export type CardUpdateProps = {
  individualDesign: DesignExtended;
};

export default CardUpdateDesign;
