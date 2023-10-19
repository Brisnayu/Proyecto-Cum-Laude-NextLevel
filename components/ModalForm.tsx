import { useState } from "react";
import styles from "@/styles/modalForm.module.css";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

const ModalForm = ({previewImage}: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    console.log("Hola?");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  console.log(isOpen);

  return (
    <div>
      <button className={styles.buttonModal} onClick={openModal}>
        Abrir Modal
      </button>

      {isOpen === true ? (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>
              &times;
            </span>
            <h2>Modal Sencillo en React</h2>
            <p>Para las imagenes!</p>
            <div>
              {previewImage.map((image) => (
                <Image
                  key={uuidv4()}
                  src={image}
                  alt="Preview"
                  width={200}
                  height={200}
                  priority
                />
              ))}
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
  previewImage: string[];
}

export default ModalForm;
