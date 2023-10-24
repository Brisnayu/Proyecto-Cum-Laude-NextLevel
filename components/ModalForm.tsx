import styles from "@/styles/modalForm.module.css";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

const ModalForm = ({ previewImage, isOpen, closeModal }: ModalProps) => {
  return (
    <div>
      {isOpen === true ? (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.close} onClick={closeModal}>
              &times;
            </button>
            <h2>Vista previa</h2>
            <div className={styles.containerImages}>
              {typeof previewImage === "string" ? (
                <Image
                  key={uuidv4()}
                  className={styles.modalImage}
                  src={previewImage}
                  alt="Preview"
                  width={200}
                  height={200}
                  priority
                />
              ) : (
                <>
                  {previewImage.map((image) => (
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
                  <p>Total de imágenes seleccionadas: {previewImage.length}</p>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export type ModalProps = {
  previewImage: string[] | string;
  isOpen: boolean;
  closeModal: () => void;
};

export default ModalForm;
