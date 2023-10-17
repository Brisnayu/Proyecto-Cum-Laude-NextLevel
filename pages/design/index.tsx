import Layout from "@/components/Layout";
import { getDesigns } from "@/libs/designs";
import { Design } from "@/types";
import { fetcher } from "@/utils/fetcher";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import ButtonBack from "@/components/ButtonBack";
import styles from "@/styles/design.module.css";

const DesignPage = ({ designs }: Props) => {
  const { data, error } = useSWR("/api/designs", fetcher, {
    refreshInterval: 300000,
  });

  const designList = (data?.designs.data as Design[]) || designs;

  return (
    <Layout
      title="Page Design"
      description="Página de los diseños"
      image="/silla.png"
    >
      <div className={styles.containerTitle}>
        <h1>Conoce un poco de los mejores diseños de la historia</h1>
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

            <Link href={`/design/${design._id}`}>
              <ButtonBack title="Leer más" color="buttonDesign" />
            </Link>
          </div>
        </div>
      ))}

      <div
        className={styles.containerButtonBack}
        style={{
          width: "100%",
          height: "30vh",
          backgroundImage: "url('/sillitas1.jpg')",
          backgroundSize: "20rem 20rem",
          backgroundRepeat: "repeat",
        }}
      >
        <Link href="/">
          <ButtonBack title="Volver" color="button" />
        </Link>
      </div>
    </Layout>
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

export default DesignPage;
