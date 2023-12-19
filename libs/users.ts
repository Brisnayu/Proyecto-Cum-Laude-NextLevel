import { TypeUser } from "@/types";

export const getUsers = async (): Promise<TypeUser[]> => {
  const response = await fetch(
    "https://project-api-design.vercel.app/api/user"
  ).then((res) => res.json());

  return response.data;
};
