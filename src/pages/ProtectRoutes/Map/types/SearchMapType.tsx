import React from "react";

// global types
import { InformationEntrieShop } from "../../../../types/informationEntrieShopTypes";

// types
import { StagePage } from "./MapTypes";

export interface SearchMapProps {
  setEntrieShops: React.Dispatch<React.SetStateAction<InformationEntrieShop[]>>;
  setStagePage: React.Dispatch<React.SetStateAction<StagePage>>;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface InformationEntrieShopOnlySearchItemPage {
  sourceAddress: string;
  destinationAddress: string;
  sourceLongitude: number;
  sourceLatitude: number;
  destinationLongitude: number;
  destinationLatitude: number;
  destinationProvince: string;
  destinationTel: string;
  destinationContact: string;
}
