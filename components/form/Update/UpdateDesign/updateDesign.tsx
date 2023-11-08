import CardUpdateDesign from "@/components/CardUpdateDesign";
import { Design, DesignExtended } from "@/types";
import { fetcher } from "@/utils/fetcher";
import { useEffect, useState } from "react";
import useSWR from "swr";
import styles from "@/styles/stylesForm/stylesUpdate/updateDesign.module.css";
import DesignForm from "../../BasicForm/designForm";

const defaultDesign: DesignExtended = {
  _id: "",
  name: "",
  year: 0,
  category: "",
  summary: "",
  curiosities: [],
  images: [],
  designer: {
    _id: "",
    name: "",
    surname: "",
    nationality: "",
    design: [],
    image: "",
    summary: "",
  },
};

const UpdateDesignPage = ({ designs }: Props) => {
  //   console.log(designs);

  const { data, error } = useSWR("/api/designs", fetcher, {
    refreshInterval: 300000,
  });

  const designList = (data?.designs.data as Design[]) || designs;

  const [individualDesign, setIndividualDesign] = useState<DesignExtended>();
  const [idChange, setIdChange] = useState<string>(designList[0]._id);

  useEffect(() => {
    const fetchDesign = async (): Promise<DesignExtended> => {
      const response = await fetch(
        `https://project-api-design.vercel.app/api/design/${idChange}`
      );
      const result = await response.json();
      setIndividualDesign(result.data);
      return result.data;
    };

    fetchDesign();
  }, [idChange]);

  console.log(individualDesign);

  return (
      <div className={styles.updateDesign}>
        <div className={styles.containerSelect}>
          <h2>Selecciona el modelo que deseas modificar: </h2>
          <select
            onChange={(e) => {
              setIdChange(e.target.value);
            }}
          >
            {designList.map((design) => (
              <option key={design._id} value={design._id}>
                {design.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.update}>
          <div className={styles.containerCurrent}>
            <CardUpdateDesign
              individualDesign={individualDesign || defaultDesign}
            />
          </div>

          <div className={styles.hola}>
            <h2>Introduce los datos que deseas modificar</h2>
            <DesignForm />
          </div>

        </div>
      </div>
  );
};

export type Props = {
  designs: Design[];
};

export default UpdateDesignPage;
