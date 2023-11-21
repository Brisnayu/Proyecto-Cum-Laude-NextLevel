import { getDesigns } from "@/libs/designs";
import styles from "@/styles/components/designs/CardDesign.module.css";
import { Design } from "@/types";
import { GetStaticProps } from "next";
import Image from "next/image";
import ButtonSelectForm from "../ButtonSelect";

const CardDesign = ({ designList }: Props) => {
  return (
    <div className={styles.principalContainer}>
      {designList.map((design) => (
        <div key={design._id} className={styles.containerDesign}>
          <h2>{design.category}</h2>
          <Image
            className={styles.imageDesign}
            src={design.images[0]}
            alt={design.name}
            width={80}
            height={80}
            priority
          />
          <div className={styles.containerText}>
            <h2>{design.name}</h2>
            <p>Año de lanzamiento: {design.year}</p>
            {/* <p>{design.summary}</p> */}
          </div>
          <ButtonSelectForm title="Eliminar"
            selectClass="buttonRun"
            selectSecondClass="buttonDelete"
          />
        </div>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const designs = await getDesigns();

  return {
    props: {
      designList: designs,
    },
    revalidate: 30,
  };
};

export type Props = {
  designList: Design[];
};

export default CardDesign;
