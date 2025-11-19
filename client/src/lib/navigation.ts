import type { NavigateFunction } from "react-router-dom";

let navigateRef: NavigateFunction | null = null;

export const setNavigate = (navigate: NavigateFunction) => {
  navigateRef = navigate;
};

export const navigateTo = (path: string) => {
  if (navigateRef) {
    navigateRef(path);
  } else {
    console.warn("Navigate not initialized");
  }
};
