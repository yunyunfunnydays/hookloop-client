interface IHeader {
  is_collapsed: boolean;
  set_is_collapsed?: React.Dispatch<React.SetStateAction<boolean>>;
  toggleCollapsed: (e: React.MouseEvent<HTMLDivElement>) => void;
}
interface ISider {
  is_collapsed: boolean;
  set_is_collapsed?: React.Dispatch<React.SetStateAction<boolean>>;
  toggleCollapsed: (e: React.MouseEvent<HTMLDivElement>) => void;
}
