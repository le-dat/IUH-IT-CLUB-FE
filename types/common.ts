export interface IDateTime {
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface IId {
  _id: string;
}

export interface ICommonMongodb extends IDateTime, IId {}

export interface IDashboard {
  equipments: number;
  events: number;
  teams: number;
  users: number;
}

export interface IPagination {
  totalResults: string,
  totalPages: string,
  currentPage:  string,
  limit: string,
}