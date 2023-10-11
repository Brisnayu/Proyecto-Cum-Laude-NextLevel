import { NextApiRequest, NextApiResponse } from "next";
import { Design } from "@/types";
import { getDesigns } from "@/libs/designs";

export type SuccessResponse = {
  designs: Design[];
};

export type ErrorResponse = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  return getDesigns()
    .then((response) => {
      res.status(200).json({ designs: response });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
}
