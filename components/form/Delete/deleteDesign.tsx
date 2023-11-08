import { getDesigns } from "@/libs/designs";
import { Design } from "@/types";
import { fetcher } from "@/utils/fetcher";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import ButtonBack from "@/components/ButtonBack";
import styles from "@/styles/design.module.css";

const DeleteDesign = ({ designs }: Props) => {
  const { data, error } = useSWR("/api/designs", fetcher, {
    refreshInterval: 300000,
  });

  const designList = (data?.designs.data as Design[]) || designs;

  console.log(designList)

  return (
    <>
      <div className={styles.containerTitle}>
        <h1>Selecciona el diseño que deseas eliminar</h1>
      </div>

      {designList.map((design) => (
        <div key={design._id} className={styles.containerDesign}>
          <h2>{design.category}</h2>
          <Image
            className={styles.imageDesign}
            src={design.images[0]}
            alt={design.name}
            width={200}
            height={200}
            priority
          />
          <div className={styles.containerText}>
            <h2>{design.name}</h2>
            <p>Año de lanzamiento: {design.year}</p>
            <br />
            <p>{design.summary}</p>

            <button>ELIMINAR</button>
          
          </div>
        </div>
      ))}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const designs = await getDesigns();

  return {
    props: {
      designs: designs,
    },
    revalidate: 30,
  };
};

export type Props = {
  designs: Design[];
};

export default DeleteDesign;
