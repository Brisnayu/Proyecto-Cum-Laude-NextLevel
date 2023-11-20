import Layout from "@/components/Layout";
import { useState } from "react";
import styles from "@/styles/stylesForm/register.module.css";
import Image from "next/image";
import ButtonSelectForm from "@/components/ButtonSelect";
import UpdateDesignPage from "@/components/form/Update/UpdateDesign/updateDesign";
import { getDesigns } from "@/libs/designs";
import { GetStaticProps } from "next";
import { Design, Designer } from "@/types";
import UpdateDesignerPage from "@/components/form/Update/UpdateDesigner/updateDesigner";
import { getDesigners } from "@/libs/designers";

const UpdatePage = ({ designs, designers }: Props) => {
  const [updateDesign, setUpdateDesign] = useState<boolean>(false);
  const [updateDesigner, setUpdateDesigner] = useState<boolean>(false);

  const showDesign = () => {
    setUpdateDesign(true);
  };

  const showDesigner = () => {
    setUpdateDesigner(true);
  };

  return (
    <Layout
      title="Page Register"
      titlePage="Actualización de información"
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
        {updateDesigner && <UpdateDesignerPage designers={designers}/>}
      </div>
      
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const designs = await getDesigns();
  const designers = await getDesigners();

  return {
    props: {
      designs: designs,
      designers: designers,
    },
    revalidate: 30,
  };
};

export type Props = {
  designs: Design[];
  designers: Designer[];
};

export default UpdatePage
