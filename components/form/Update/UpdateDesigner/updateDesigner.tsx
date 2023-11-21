import CardUpdateDesigner from "@/components/CardUpdateDesigner";
import { getDesigners } from "@/libs/designers";
import { Designer, DesignerExtended } from "@/types";
import { fetcher } from "@/utils/fetcher";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import useSWR from "swr";
import DesignerForm from "../../BasicForm/designerForm";
import FormUpdate from "@/components/form/Update/formUpdate";

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
    <FormUpdate
      change={setIdChange}
      list={designerList}
      currentInformation={
        <CardUpdateDesigner
          individualDesigner={individualDesigner || defaultDesigner}
        />
      }
      formUpdate={<DesignerForm />}
    />
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
