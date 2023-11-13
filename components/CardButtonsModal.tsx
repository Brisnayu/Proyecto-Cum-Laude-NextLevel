import styles from "@/styles/button.module.css";
import ButtonSelect from "./ButtonSelect";

const CardButtonsModal = ({ closeModalSend }: Props) => {
  return (
    <div className={styles.containerButtons}>
      <ButtonSelect
        title="Estupendo ✌🏽"
        selectClass="buttonRun"
        selectSecondClass="buttonSend"
        functionElement={closeModalSend}
      />
      <ButtonSelect
        title="Eliminar ❌"
        selectClass="buttonRun"
        selectSecondClass="buttonDelete"
      />
    </div>
  );
};

export type Props = {
  closeModalSend: () => void;
};

export default CardButtonsModal;
