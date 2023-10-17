import { NextApiRequest, NextApiResponse } from "next";
import { Designer } from "@/types";
import { getDesigners } from "@/libs/designers";

export type SuccessResponse = {
  designers: Designer[];
};

export type ErrorResponse = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  return getDesigners()
    .then((response) => {
      res.status(200).json({ designers: response });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
}
