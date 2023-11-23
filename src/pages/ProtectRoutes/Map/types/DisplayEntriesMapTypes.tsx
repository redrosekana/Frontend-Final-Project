// global types
import { InformationEntrieShop } from "../../../../types/informationEntrieShopTypes";

export interface DisplayEntriesMapProps extends InformationEntrieShop {
  clickDetailMap: (information: InformationEntrieShop) => void;
}
