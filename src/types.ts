export type DataItem = {
  id: string;
  isActive: boolean;
  tilt: number;
  capacity?: number;
  model?: string;
};

export type DataArr = {
  dataProp: DataItem[];
  deleteArrProp: (id?: string) => void;
};
