import { UseFormRegister } from "react-hook-form";

// types
import { FormSearchBoardgameRecommend } from "./RecommendTypes";

export interface SearchBoardgameRecommendInputProps {
  type: string;
  placeholder: string;
  register: UseFormRegister<FormSearchBoardgameRecommend>;
  required: boolean;
}
