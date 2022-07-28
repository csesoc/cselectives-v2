export const setDevVars = () => {
  if (process.env.NODE_ENV === "development") {
    process.env.BACKEND_API_URI = "http://localhost:6969/api";
  }
};
