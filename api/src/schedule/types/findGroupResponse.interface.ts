interface Groups {
  id: number;
  name: string;
  fac: string;
  level: string;
  course: number;
}

export interface FindGroupResponseInterface {
  success: boolean;
  message: string;
  data: Groups[];
}
