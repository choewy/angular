export type Role = {
  id: string;
  name: string;
};

export type Manager = {
  id: string;
  account: string;
  name: string;
  roles: Role[];
};
