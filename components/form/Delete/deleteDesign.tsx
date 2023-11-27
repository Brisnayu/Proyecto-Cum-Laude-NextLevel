import { getDesigns } from "@/libs/designs";
import { Design } from "@/types";
import { fetcher } from "@/utils/fetcher";
import { GetStaticProps } from "next";
import useSWR from "swr";
import styles from "@/styles/design.module.css";
import CardDesign from "@/components/design/CardDesign";
import { useState } from "react";

const DeleteDesign = ({ designs }: Props) => {

  const { data, error } = useSWR("/api/designs", fetcher, {
    refreshInterval: 300000,
  });

  const designList = (data?.designs.data as Design[]) || designs;

  console.log(designList);

  return (
    <div>
      <div className={styles.containerTitle}>
        <h1>Selecciona el diseño que deseas eliminar</h1>
      </div>

      <CardDesign designList={designList}/>
    </div>
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
