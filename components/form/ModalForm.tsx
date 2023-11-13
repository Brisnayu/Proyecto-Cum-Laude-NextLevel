import styles from "@/styles/components/modalForm.module.css";

const ModalForm = ({ children, isOpen, closeModal }: ModalProps) => {
  return (
    <div>
      {isOpen === true ? (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.close} onClick={closeModal}>
              &times;
            </button>
            {children}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export type ModalProps = {
  children: React.ReactNode;  
  isOpen: boolean;
  closeModal: () => void;
};

export default ModalForm;
