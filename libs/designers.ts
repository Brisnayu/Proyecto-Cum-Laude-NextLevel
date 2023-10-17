import { Designer, DesignerExtended } from "@/types";

export const getDesigners = async (): Promise<Designer[]> => {
  const response = await fetch(
    "https://project-api-design.vercel.app/api/designer"
  ).then((res) => res.json());

  return response.data;
};

export const getOneDesigners = async (
  entity: string
): Promise<DesignerExtended> => {
  const response = await fetch(
    `https://project-api-design.vercel.app/api/designer/${entity}`
  ).then((res) => res.json());

  console.log(response.data);

  return response.data;
};