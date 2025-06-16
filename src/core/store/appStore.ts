import { create } from "zustand";
import { type AppStore } from "../types/interfaces";

export const useAppStore = create<AppStore>((set, get) => ({
    currentWord: undefined,
    currentClue: undefined
}))