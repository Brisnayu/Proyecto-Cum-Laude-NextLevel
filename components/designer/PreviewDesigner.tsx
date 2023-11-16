import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import CardButtonsModal from "../CardButtonsModal";
import styles from "@/styles/components/basic/previewRegister.module.css";
import { TypeFormDesignerDataExtended } from "@/components/form/BasicForm/designerForm";

const PreviewDesigner = ({ infoSent, closeModalSend }: Props) => {
  return (
    <>
      <h2>Nuevo Diseñador registrado</h2>

      <div className={styles.containerText}>
        <h3>
          Nombre: <span>{infoSent.name}</span>
        </h3>
        <h3>
          Apellido: <span>{infoSent.surname}</span>
        </h3>
        <h3>
          Nacionalidad: <span>{infoSent.nationality}</span>
        </h3>
      </div>

      <div className={styles.containerText}>
        <h3>
          Resumen: <span>{infoSent.summary}</span>
        </h3>
      </div>

      <div className={styles.containerImages}>
        <h3>Imagen:</h3>
        <div className={styles.images}>
          <Image
            key={uuidv4()}
            className={styles.modalImage}
            src={infoSent.image}
            alt="Preview"
            width={200}
            height={200}
            priority
          />
        </div>
      </div>

      <CardButtonsModal closeModalSend={closeModalSend} />
    </>
  );
};

export type Props = {
  closeModalSend: () => void;
  infoSent: TypeFormDesignerDataExtended;
};

export default PreviewDesigner;
