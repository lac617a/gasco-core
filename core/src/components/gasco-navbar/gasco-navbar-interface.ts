export interface INavbarUser {
  name: string;
  role: string;
  avatar: string;
}

export interface INavbarUserNav {
  name: string;
  link: string;
}[]

export interface IGetUserOfNavbar {
  user: INavbarUser;
  userNav: INavbarUserNav[];
}