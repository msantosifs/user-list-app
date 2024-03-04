import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export interface UserColumn {
  name: UserColumnEnum;
  icon: IconDefinition;
}

export enum UserColumnEnum {
  Id = 'id',
  Name = 'name',
  Email = 'email',
  Gender = 'gender',
  Status = 'status'
}

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc'
}
