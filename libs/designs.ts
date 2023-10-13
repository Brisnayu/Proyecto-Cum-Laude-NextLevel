import { Design, DesignExtended } from "@/types";

export const getDesigns = async (): Promise<Design[]> => {
  const response = await fetch(
    "https://project-api-design.vercel.app/api/design"
  ).then((res) => res.json());

  return response.data;
};

export const getOneDesigns = async (
  entity: string
): Promise<DesignExtended> => {
  const response = await fetch(
    `https://project-api-design.vercel.app/api/design/${entity}`
  ).then((res) => res.json());

  console.log(response.data);

  return response.data;
};
