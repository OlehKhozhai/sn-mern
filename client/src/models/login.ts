export interface ILoginValues {
  email: string;
  password: string;
}

export interface ILoginValuesSaga {
  values: ILoginValues;
  type: string;
}
