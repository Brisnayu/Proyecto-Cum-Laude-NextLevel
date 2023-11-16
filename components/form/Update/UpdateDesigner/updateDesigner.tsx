import styles from "@/styles/pages/form/stylesForm/updateDesigner.module.css";
import CardUpdateDesigner from "@/components/CardUpdateDesigner";
import { getDesigners } from "@/libs/designers";
import { Designer, DesignerExtended } from "@/types";
import { fetcher } from "@/utils/fetcher";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import useSWR from "swr";
import DesignerForm from "../../BasicForm/designerForm";

const defaultDesigner: DesignerExtended = {
  _id: "",
  name: "",
  surname: "",
  nationality: "",
  design: [],
  image: "",
  summary: "",
};

const UpdateDesignerPage = ({ designers }: Props) => {
  const { data, error } = useSWR("/api/designers", fetcher, {
    refreshInterval: 300000,
  });

  const designerList = (data?.designers.data as Designer[]) || designers;

  console.log(designerList);

  const [individualDesigner, setIndividualDesigner] =
    useState<DesignerExtended>();
  const [idChange, setIdChange] = useState<string>(designerList[0]._id);

  useEffect(() => {
    const fetchDesign = async (): Promise<DesignerExtended> => {
      const response = await fetch(
        `https://project-api-design.vercel.app/api/designer/${idChange}`
      );
      const result = await response.json();
      setIndividualDesigner(result.data);
      return result.data;
    };

    fetchDesign();
  }, [idChange]);

  return (
    <div className={styles.updateDesign}>
      <div className={styles.containerSelect}>
        <h2>Selecciona el diseñador que deseas modificar</h2>
        <select
          onChange={(e) => {
            setIdChange(e.target.value);
          }}
        >
          {designerList.map((designer) => (
            <option key={designer._id} value={designer._id}>
              {designer.name} {designer.surname}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.update}>
        <div className={styles.containerCurrent}>
          <CardUpdateDesigner
            individualDesigner={individualDesigner || defaultDesigner}
          />
        </div>

        <div className={styles.hola}>
          <h2>Introduce los datos que deseas modificar</h2>
          <DesignerForm />
        </div>
      </div>
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

export default UpdateDesignerPage;
