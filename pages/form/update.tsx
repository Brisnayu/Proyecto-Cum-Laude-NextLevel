import Layout from "@/components/Layout";
import { useState } from "react";
import styles from "@/styles/pages/form/principalPageForm.module.css";
import UpdateDesignPage from "@/components/form/Update/UpdateDesign/updateDesign";
import { getDesigns } from "@/libs/designs";
import { GetStaticProps } from "next";
import { Design, Designer } from "@/types";
import UpdateDesignerPage from "@/components/form/Update/UpdateDesigner/updateDesigner";
import { getDesigners } from "@/libs/designers";
import HomeForm from "@/components/form/BasicForm/HomeForm";

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
          <HomeForm 
          firstTitle="Actualizar un diseño"
          secondTitle="Actualizar un diseñador"
          titleImage="¿Qué deseas actualizar?"
          image="/imageForm/update.png"
          showDesign={showDesign} 
          showDesigner={showDesigner} />
        )}

        {updateDesign && <UpdateDesignPage designs={designs} />}
        {updateDesigner && <UpdateDesignerPage designers={designers} />}
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

export default UpdatePage;
