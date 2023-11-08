import styles from "@/styles/form.module.css";
import Image from "next/image";
import DesignForm from "@/components/form/BasicForm/designForm";

const FormDesignPage = () => {
  return (
    <>
      <div className={styles.containerForm}>
        <div className={styles.containerLeft}>
          <h2>Registra un nuevo diseño 🪑</h2>
          <Image
            src="/imageForm/formDesign.png"
            alt="image"
            width={450}
            height={450}
            priority
          />
        </div>

        <DesignForm />
      </div>
    </>
  );
};

export default FormDesignPage;
