export interface IDateTime {
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface IId {
  _id: string;
}

export interface ICommonMongodb extends IDateTime, IId {}
