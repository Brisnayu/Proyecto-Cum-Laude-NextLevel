import Layout from "@/components/Layout";
import { useState } from "react";
import styles from "@/styles/pages/form/principalPageForm.module.css";
import HomeForm from "@/components/form/BasicForm/HomeForm";
import DeleteDesign from "@/components/form/Delete/deleteDesign";
import { GetStaticProps } from "next";
import { getDesigns } from "@/libs/designs";
import { getDesigners } from "@/libs/designers";
import { Design, Designer } from "@/types";
import DeleteDesigner from "@/components/form/Delete/deleteDesigner";

const DeletePage = ({ designs, designers }: Props) => {
  const [deleteDesign, setDeleteDesign] = useState<boolean>(false);
  const [deleteDesigner, setDeleteDesigner] = useState<boolean>(false);

  const showDesign = () => {
    setDeleteDesign(true);
  };

  const showDesigner = () => {
    setDeleteDesigner(true);
  };

  return (
    <Layout
      title="Page Delete"
      titlePage="Eliminación de información"
      description="Página principal eliminar"
      image="/silla.png"
    >
      <div className={styles.containerPrincipal}>
        {!deleteDesign && !deleteDesigner && (
          <HomeForm
          firstTitle="Eliminar diseño"
          secondTitle="Eliminar Diseñador"
          titleImage="Selecciona una opción para eliminar"
          image="/imageForm/delete.png"
          showDesign={showDesign}
          showDesigner={showDesigner}
        />
        )}

        {deleteDesign && <DeleteDesign designs={designs} />}
        {deleteDesigner && <DeleteDesigner designers={designers} />}
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

export default DeletePage;
