import Layout from "@/components/Layout";
import { useState } from "react";
import styles from "@/styles/stylesForm/register.module.css";
import Image from "next/image";
import ButtonSelectForm from "@/components/ButtonSelect";
import DeleteDesign from "@/components/form/Delete/deleteDesign";
import { GetStaticProps } from "next";
import { getDesigns } from "@/libs/designs";
import { getDesigners } from "@/libs/designers";
import { Design, Designer } from "@/types";

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
          <>
            <div className={styles.containerButtons}>
              <ButtonSelectForm
                title="Eliminar un Diseño"
                functionElement={showDesign}
                selectClass="buttonUp"
              />
              <ButtonSelectForm
                title="Eliminar un Diseñador"
                functionElement={showDesigner}
                selectClass="buttonUp"
              />
            </div>
            <div className={styles.containerImage}>
              <h2>
                Elige una opción para poder hacer eliminar alguna información
              </h2>
              <Image
                src="/imageForm/delete.png"
                alt="Image Form Delete"
                width={300}
                height={300}
                priority
              />
            </div>
          </>
        )}

        {deleteDesign && <DeleteDesign designs={designs} />}
        {deleteDesigner && <DeleteDesign designs={designs} />}
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
