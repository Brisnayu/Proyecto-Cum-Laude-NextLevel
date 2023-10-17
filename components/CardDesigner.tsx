import styles from "@/styles/cardDesigner.module.css";
import Image from "next/image";
import Link from "next/link";
import ButtonBack from "./ButtonBack";

export type CardProps = {
  name: string;
  nationality: string;
  avatar: string;
  designerId: string;
};

const CardDesigner = ({ name, nationality, avatar, designerId }: CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardInfo}>
        <div className={styles.cardAvatar}>
          <Image
            className={styles.imageAvatar}
            src={avatar}
            alt={name}
            width={100}
            height={100}
            priority
          />
        </div>
        <div className={styles.cardTitle}>{name}</div>
        <div className={styles.cardSubtitle}>{nationality}</div>
      </div>
      <div className={styles.cardSocial}>
        <Link href={`/designer/${designerId}`}>
          <ButtonBack title="Leer más" color="buttonDesign" />
        </Link>
      </div>
    </div>
  );
};

export default CardDesigner;
