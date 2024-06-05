let navigateFunction;

export const setNavigateFunction = (navigate) => {
  navigateFunction = navigate;
};

export const navigate = (path) => {
  if (navigateFunction) {
    navigateFunction(path);
  } else {
    console.error("Navigate function is not set.");
  }
};
