import { getDesigners } from "@/libs/designers";
import styles from "@/styles/components/designs/CardDesign.module.css";
import { Designer } from "@/types";
import { GetStaticProps } from "next";
import Image from "next/image";
import ButtonSelect from "../ButtonSelect";
import { useState } from "react";

const CardDesigner = ({ designerList }: Props) => {
  const [deleteElement, setDeleteElement] = useState(new Set());
  const [selectedDesigns, setSelectedDesigns] = useState(new Set());

  const toggleDesignSelection = (designId: string) => {
    const newSelectedDesigns = new Set(selectedDesigns);

    if (newSelectedDesigns.has(designId)) {
      newSelectedDesigns.delete(designId);
    } else {
      newSelectedDesigns.add(designId);
    }

    setSelectedDesigns(newSelectedDesigns);
  };

  const deletedElement = (designId: string) => {
    const newDeletedElement = new Set(deleteElement);

    console.log("ESTOY DENTRO DE ESTO");

    if (newDeletedElement.has(designId)) {
      newDeletedElement.delete(designId);
    } else {
      newDeletedElement.add(designId);
    }

    setDeleteElement(newDeletedElement);
  };

  const tokenAuth = async (id: string) => {
    const token = localStorage.getItem("authToken");

    console.log(token);

    if (token) {
      await InformationDelete(id, token);
    } else {
      console.error("Usuario no autenticado");
    }
  };

  const InformationDelete = async (
    id: string,
    token: string
  ): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:4001/api/designer/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error(
          `Error al eliminar la información. Código de estado: ${response.status}`
        );
      } else {
        console.log("Información eliminada correctamente.");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud DELETE:", error);
    }
  };

  return (
    <div className={styles.principalContainer}>
      {designerList.map((designer) => (
        <div key={designer._id} className={styles.containerDesign}>
          {selectedDesigns.has(designer._id) ? (
            <div className={styles.containerDelete}>
              <h3>¿Quieres eliminar ese elemento?</h3>
              <div className={styles.buttonsModal}>
                <ButtonSelect
                  title="Sí"
                  selectClass="buttonRun"
                  selectSecondClass="buttonSend"
                  functionElement={() => {
                    tokenAuth(designer._id);
                    deletedElement(designer._id);
                    toggleDesignSelection(designer._id);
                  }}
                />
                <ButtonSelect
                  title="No"
                  selectClass="buttonRun"
                  selectSecondClass="buttonDelete"
                  functionElement={() => toggleDesignSelection(designer._id)}
                />
              </div>
            </div>
          ) : (
            <div
              className={`${styles.containerInformation} ${
                deleteElement.has(designer._id) ? styles.deleteElement : ""
              }`}
            >
              {/* <h2>{designer.category}</h2> */}
              <Image
                className={styles.imageDesign}
                src={designer.image}
                alt={designer.name}
                width={80}
                height={80}
                objectFit="cover"
                priority
              />
              <div className={styles.containerText}>
                <h2>{designer.name} {designer.surname}</h2>
                {/* <p>Año designer lanzamiento: {designer.year}</p> */}
                {/* <p>{design.summary}</p> */}
              </div>
              <ButtonSelect
                title="Eliminar"
                selectClass="buttonRun"
                selectSecondClass="buttonDelete"
                functionElement={() => toggleDesignSelection(designer._id)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const designers = await getDesigners();

  return {
    props: {
      designerList: designers,
    },
    revalidate: 30,
  };
};

export type Props = {
    designerList: Designer[];
};

export default CardDesigner;
