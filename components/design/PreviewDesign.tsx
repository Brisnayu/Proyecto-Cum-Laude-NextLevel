import styles from "@/styles/components/designs/previewDesigns.module.css";
import CardButtonsModal from "../CardButtonsModal";
import { TypeFormDataExtended } from "../form/BasicForm/designForm";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

const PreviewDesign = ({ closeModalSend, infoSent }: Props) => {
  return (
    <>
      <h2>Nuevo Diseño registrado</h2>

      <div className={styles.containerText}>
        <h3>
          Nombre del diseño: <span>{infoSent.name}</span>
        </h3>
        <h3>
          Año del lanzamiento: <span>{infoSent.year}</span>
        </h3>
        <h3>
          Categoría: <span>{infoSent.category}</span>
        </h3>
      </div>

      <div className={styles.containerText}>
        <h3>
          Resumen: <span>{infoSent.summary}</span>
        </h3>
      </div>

      {infoSent.curiosities && (
        <div className={styles.containerList}>
          <ul>
            <h3>Lista de curiosidades:</h3>
          </ul>
          {infoSent.curiosities.map((curiosity) => (
            <li key={uuidv4()}>
              &bull; {curiosity.title}: <span>{curiosity.description}</span>
            </li>
          ))}
        </div>
      )}

      {infoSent.images && (
        <div className={styles.containerImages}>
          <h3>Imágenes:</h3>
          <div className={styles.images}>
            {infoSent.images.map((image) => (
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

      <CardButtonsModal closeModalSend={closeModalSend} />
    </>
  );
};

export type Props = {
  closeModalSend: () => void;
  infoSent: TypeFormDataExtended;
};

export default PreviewDesign;
