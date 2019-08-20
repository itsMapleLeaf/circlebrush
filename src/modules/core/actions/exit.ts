import { remote } from "electron";

export const exit = () => {
  remote.process.exit(0);
};
