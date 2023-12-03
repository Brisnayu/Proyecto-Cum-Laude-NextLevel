import Link from "next/link";
import ButtonBack from "./ButtonBack";
import styles from "@/styles/components/basic/goBack.module.css";

const GoBack = ({direction}: GoBackProps) => {
  return (
    <div
      className={styles.containerButtonBack}
      style={{
        width: "100%",
        height: "14vh",
        backgroundImage: "url('/sillitas1.jpg')",
        backgroundSize: "20rem 20rem",
        backgroundRepeat: "repeat",
      }}
    >
      <Link href={direction}>
        <ButtonBack title="Volver" color="button" />
      </Link>
    </div>
  );
};

export type GoBackProps = {
    direction: string;
}

export default GoBack;
