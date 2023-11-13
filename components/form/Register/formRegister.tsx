import styles from "@/styles/pages/form/register/formRegister.module.css";
import Image from "next/image";

const FormRegister = ({ title, photo, children }: Props) => {
  return (
    <div className={styles.containerForm}>
      <div className={styles.containerLeft}>
        <h2>{title}</h2>
        <Image
          src={photo}
          alt="image"
          width={450}
          height={450}
          priority
        />
      </div>

      {children}
    </div>
  );
};

export type Props = {
  title: string;
  photo: string;
  children: React.ReactNode;
};

export default FormRegister;
