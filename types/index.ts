export type Design = {
  _id: string;
  name: string;
  images: string[];
  year: number;
  category: string;
  designer: string;
  summary: string;
};

export type Designer = {
  _id: string;
  name: string;
  surname: string;
  nationality: string;
  image: string;
  summary: string;
};

export type DesignExtended = Omit<Design, "designer"> & {
  designer: Designer;
};

