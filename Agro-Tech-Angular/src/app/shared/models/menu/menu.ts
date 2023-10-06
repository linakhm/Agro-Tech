export type Menu = {
  id: string;
  titre: string;
  url?: string;
  icon?: string;
  active?: boolean;
  sousMenu?: Array<Menu>;
}
