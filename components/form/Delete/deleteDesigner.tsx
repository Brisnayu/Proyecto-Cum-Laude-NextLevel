import Layout from "@/components/Layout";
import { getDesigners } from "@/libs/designers";
import { Designer } from "@/types";
import { fetcher } from "@/utils/fetcher";
import { GetStaticProps } from "next";
import useSWR from "swr";
import styles from "@/styles/designer.module.css";
import CardDesigner from "@/components/designer/CardDesigner";

const DeleteDesigner = ({ designers }: Props) => {
  const { data, error } = useSWR("/api/designers", fetcher, {
    refreshInterval: 300000,
  });

  const designerList = (data?.designers.data as Designer[]) || designers;

  // console.log(designerList)

  return (
    <div>
      <div className={styles.containerTitle}>
        <h1>Selecciona el diseño que deseas eliminar</h1>
      </div>

      <CardDesigner designerList={designerList} />
    </div>
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

export default DeleteDesigner;
