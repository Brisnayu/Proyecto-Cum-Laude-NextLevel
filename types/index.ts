export type Design = {
  _id: string;
  name: string;
  images: string[];
  year: number;
  category: string;
  designer: string;
};

export type Designer = {
  _id: string;
  name: string;
  surname: string;
  nationality: string;
  image: string;
};

export type DesignExtended = Omit<Design, "designer"> & {
  designer: Designer;
};

