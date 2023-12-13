import Layout from "@/components/Layout";
import { getDesigners } from "@/libs/designers";
import { Designer } from "@/types";
import { fetcher } from "@/utils/fetcher";
import { GetStaticProps } from "next";
import useSWR from "swr";
import styles from "@/styles/designer.module.css";
import CardDesigner from "@/components/CardDesigner";
import { v4 as uuidv4 } from "uuid";
import GoBack from "@/components/GoBack";

const DesignerPage = ({ designers }: Props) => {
  const { data, error } = useSWR("/api/designers", fetcher, {
    refreshInterval: 300000,
  });

  const designerList = (data?.designers.data as Designer[]) || designers;

    // console.log(designerList)

  return (
    <Layout
      title="Page Design"
      titlePage="Inicio diseñadores"
      description="Página de los diseños"
      image="/silla.png"
    >
      <div className={styles.containerTitle}>
        <h1>Conoce a algunos grandes diseñadores</h1>
      </div>

      <div className={styles.containerCards}>
        {designerList.map((designer) => (
          <CardDesigner
            key={uuidv4()}
            name={`${designer.name} ${designer.surname}`}
            nationality={designer.nationality}
            avatar={designer.image}
            designerId={designer._id}
          />
        ))}
      </div>

      <GoBack direction="/"/>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const designers = await getDesigners();

  return {
    props: {
      designers: designers,
    },
    revalidate: 30,
  };
};

export type Props = {
  designers: Designer[];
};

export default DesignerPage;
