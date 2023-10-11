import { Design } from "@/types";

export const getDesigns = async (): Promise<Design[]> => {
  const response = await fetch(
    "https://project-api-design.vercel.app/api/design"
  ).then((res) => res.json());

  return response;
};
