import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  RecommendPayloadState,
  CategoryState,
} from "./types/recommendPayloadSlice.interface";

const initialState: RecommendPayloadState = {
  players: "",
  time: "",
  weight: "",
  category: [],
};

let checkAll = false;
const recommendPayloadSlice = createSlice({
  name: "recommendPayload",
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<string>) => {
      if (state.players && state.players === action.payload) {
        state.players = "";
      } else {
        state.players = action.payload;
      }
    },

    setTime: (state, action: PayloadAction<string>) => {
      if (state.time && state.time === action.payload) {
        state.time = "";
      } else {
        state.time = action.payload;
      }
    },

    setWeight: (state, action: PayloadAction<string>) => {
      if (state.weight && state.weight === action.payload) {
        state.weight = "";
      } else {
        state.weight = action.payload;
      }
    },

    setCategory: (state, action: PayloadAction<CategoryState>) => {
      if (state.category.find((e) => e.index === action.payload.index)) {
        state.category = state.category.filter(
          (e) => e.index !== action.payload.index
        );
      } else {
        state.category.push(action.payload);
      }
    },

    setAllCategory: (state, action: PayloadAction<CategoryState[]>) => {
      if (checkAll) {
        state.category = [];
        checkAll = false;
      } else {
        checkAll = true;
        state.category = action.payload;
      }
    },
  },
});

export const { setPlayers, setTime, setWeight, setCategory, setAllCategory } =
  recommendPayloadSlice.actions;

export default recommendPayloadSlice.reducer;
