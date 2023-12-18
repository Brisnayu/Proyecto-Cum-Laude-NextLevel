export type CuriositiesDesign = {
  title: string;
  description: string;
};

export type Design = {
  _id: string;
  name: string;
  images: string[];
  year: number;
  category: string;
  designer: string;
  summary: string;
  curiosities: CuriositiesDesign[];
};

export type Designer = {
  _id: string;
  name: string;
  surname: string;
  nationality: string;
  design: string[];
  image: string;
  summary: string;
};

export type DesignInDesigner = {
  _id: string;
  name: string;
  images: string[];
  year: number;
  category: string;
};

export type DesignExtended = Omit<Design, "designer"> & {
  designer: Designer;
};

export type DesignerExtended = Omit<Designer, "design"> & {
  design: DesignInDesigner[];
};

export type TypeUser = {
  _id: string;
  email: string;
  name: string;
  password: null;
  avatar: string;
}
