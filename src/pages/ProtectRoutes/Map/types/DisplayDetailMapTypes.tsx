import React from "react";

// types
import { StagePage } from "./MapTypes";

// global types
import { InformationEntrieShop } from "../../../../types/informationEntrieShopTypes";

export interface DisplayDetailMapProps extends InformationEntrieShop {
  setStagePage: React.Dispatch<React.SetStateAction<StagePage>>;
}
