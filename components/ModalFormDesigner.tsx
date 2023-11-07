import styles from "@/styles/stylesForm/modalDesign.module.css";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { TypeFormDesignerDataExtended } from "./form/Register/formDesigner";

const ModalFormDesign = ({
  isOpenSend,
  closeModalSend,
  infoSent,
}: ModalProps) => {
  // console.log("Dentro DE MODALFORMDESIGN", infoSent);

  return (
    <div>
      {isOpenSend === true && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.close} onClick={closeModalSend}>
              &times;
            </button>
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

            <div className={styles.containerButtons}>
              <button
                className={`${styles.buttonModal} ${styles.buttonSend}`}
                onClick={closeModalSend}
              >
                Estupendo ✌🏽
              </button>
              <button
                className={`${styles.buttonModal} ${styles.buttonDelete}`}
              >
                Eliminar ❌
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export type ModalProps = {
  isOpenSend: boolean;
  closeModalSend: () => void;
  infoSent: TypeFormDesignerDataExtended;
};

export default ModalFormDesign;
