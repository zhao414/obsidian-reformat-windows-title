import { type TitleSettings, DEFAULT_SETTINGS } from "./settings";

export function formatTitle(
  settings: TitleSettings,
  vaultName: string,
  fileName: string | undefined,
  obsidianVersion: string | undefined,
): string {
  const order =
    settings.titleOrder === "default"
      ? DEFAULT_SETTINGS.titleOrder
      : settings.titleOrder;
  const separator =
    settings.titleOrder === "default"
      ? DEFAULT_SETTINGS.separator
      : settings.separator;

  const parts: string[] = [];

  if (order === "file-first") {
    if (fileName) {
      parts.push(fileName);
    }
    parts.push(vaultName);
  } else {
    parts.push(vaultName);
    if (fileName) {
      parts.push(fileName);
    }
  }

  if (settings.showObsidianVersion) {
    parts.push(obsidianVersion ? `Obsidian ${obsidianVersion}` : "Obsidian");
  }

  return parts.join(separator);
}
