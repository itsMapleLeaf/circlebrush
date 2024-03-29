import { MenuItemList } from "../types/MenuItem"

import { importSkinFolder } from "../../project/actions/importSkinFolder"
import { exit } from "../actions/exit"
import { exportSkinFolder } from "../../project/actions/exportSkinFolder"

export const getFileMenuItems = (): MenuItemList => [
  {
    name: "new",
    label: "New",
    shortcut: "Ctrl + N",
  },
  null,
  {
    name: "open",
    label: "Open",
    shortcut: "Ctrl + O",
  },
  {
    name: "open-recent",
    label: "Open recent",
  },
  null,
  {
    name: "save",
    label: "Save",
    shortcut: "Ctrl + S",
  },
  {
    name: "save-as",
    label: "Save as...",
    shortcut: "Ctrl + Shift + S",
  },
  null,
  {
    name: "import",
    label: "Import skin folder...",
    shortcut: "Ctrl + I",
    action: importSkinFolder,
  },
  null,
  {
    name: "export",
    label: "Export",
    shortcut: "Ctrl + E",
  },
  {
    name: "export-to",
    label: "Export to...",
    shortcut: "Ctrl + Shift + E",
    action: exportSkinFolder,
  },
  {
    name: "export-skin",
    label: "Export as skin file...",
    shortcut: "Ctrl + Shift + Alt + E",
  },
  null,
  {
    name: "exit",
    label: "Exit",
    shortcut: "Alt + F4",
    action: exit,
  },
]
