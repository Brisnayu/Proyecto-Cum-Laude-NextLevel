import styles from "@/styles/form.module.css";
import Image from "next/image";
import DesignerForm from "../BasicForm/designerForm";

const FormDesignerPage = () => {
  return (
    <>
      <div className={styles.containerForm}>
        <div className={styles.containerLeft}>
          <h2>Registra un nuevo diseñador 🛋️</h2>
          <Image
            src="/imageForm/formDesigner.png"
            alt="image"
            width={450}
            height={450}
            priority
          />
        </div>

        <DesignerForm />

      </div>
    </>
  );
};

export default FormDesignerPage;
