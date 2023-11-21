import CardUpdateDesign from "@/components/CardUpdateDesign";
import { Design, DesignExtended } from "@/types";
import { fetcher } from "@/utils/fetcher";
import { useEffect, useState } from "react";
import useSWR from "swr";
import DesignForm from "../../BasicForm/designForm";
import FormUpdate from "@/components/form/Update/formUpdate";

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

  // console.log(individualDesign);

  return (
    <FormUpdate
      change={setIdChange}
      list={designList}
      currentInformation={
        <CardUpdateDesign
          individualDesign={individualDesign || defaultDesign}
        />
      }
      formUpdate={<DesignForm />}
    />
  );
};

export type Props = {
  designs: Design[];
};

export default UpdateDesignPage;
