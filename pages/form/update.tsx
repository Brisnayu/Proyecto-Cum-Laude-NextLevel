import Layout from "@/components/Layout";
import FormDesignerPage from "@/components/form/Register/formDesigner";
import { useState } from "react";
import styles from "@/styles/stylesForm/register.module.css";
import Image from "next/image";
import ButtonSelectForm from "@/components/ButtonSelectForm";
import UpdateDesignPage from "@/components/form/Update/UpdateDesign/updateDesign";
import { getDesigns } from "@/libs/designs";
import { GetStaticProps } from "next";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { Design } from "@/types";

const UpdatePage = ({ designs }: Props) => {
  const [updateDesign, setUpdateDesign] = useState<boolean>(false);
  const [updateDesigner, setUpdateDesigner] = useState<boolean>(false);

  const { data, error } = useSWR("/api/designs", fetcher, {
    refreshInterval: 300000,
  });

  const designList = (data?.designs.data as Design[]) || designs;

  const showDesign = () => {
    setUpdateDesign(true);
  };

  const showDesigner = () => {
    setUpdateDesigner(true);
  };

  return (
    <Layout
      title="Page Register"
      description="Página principal formularios"
      image="/silla.png"
    >
      <div className={styles.containerPrincipal}>
        {!updateDesign && !updateDesigner && (
          <>
            <div className={styles.containerButtons}>
              <ButtonSelectForm
                title="Actualizar un diseño"
                functionElement={showDesign}
                selectClass="buttonUp"
              />
              <ButtonSelectForm
                title="Actualizar un diseñador"
                functionElement={showDesigner}
                selectClass="buttonUp"
              />
            </div>
            <div className={styles.containerImage}>
              <h2>¿Qué deseas actualizar?</h2>
              <Image
                src="/imageForm/update.png"
                alt="Image Form Update"
                width={300}
                height={300}
                priority
              />
            </div>
          </>
        )}

        {updateDesign && <UpdateDesignPage designs={designs} />}
        {updateDesigner && <FormDesignerPage />}
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

export default UpdatePage
