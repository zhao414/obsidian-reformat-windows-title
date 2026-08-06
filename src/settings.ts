import { App, PluginSettingTab, Setting } from "obsidian";
import type ReformatWindowsTitlePlugin from "./main";

export interface TitleSettings {
  titleOrder: "file-first" | "vault-first" | "default";
  separator: string;
  showObsidianVersion: boolean;
}

export const DEFAULT_SETTINGS: TitleSettings = {
  titleOrder: "file-first",
  separator: " - ",
  showObsidianVersion: true,
};

export class TitleSettingTab extends PluginSettingTab {
  plugin: ReformatWindowsTitlePlugin;

  constructor(app: App, plugin: ReformatWindowsTitlePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }


  getSettingDefinitions() {
    return [
      {
        name: "Title order",
        desc: "Choose whether the file name or vault name appears first in the window title.",
        render: (setting: Setting) => {
          setting.addDropdown((dropdown) =>
            dropdown
              .addOption("file-first", "File name first")
              .addOption("vault-first", "Vault name first")
              .addOption("default", "Use default")
              .setValue(this.plugin.settings.titleOrder)
              .onChange(async (value) => {
                this.plugin.settings.titleOrder = value as TitleSettings["titleOrder"];
                if (value === "default") {
                  this.plugin.settings.separator = DEFAULT_SETTINGS.separator;
                  this.plugin.settings.showObsidianVersion = DEFAULT_SETTINGS.showObsidianVersion;
                }
                await this.plugin.saveSettings();
                this.plugin.updateTitle();
                this.update();
              }),
          );
        },
      },
      {
        name: "Separator",
        desc: "The text used between the vault name and file name.",
        visible: () => this.plugin.settings.titleOrder !== "default",
        render: (setting: Setting) => {
          setting.addText((text) => {
            text
              .setPlaceholder(" - ")
              .setValue(this.plugin.settings.separator)
              .onChange(async (value) => {
                this.plugin.settings.separator = value;
                await this.plugin.saveSettings();
                this.plugin.updateTitle();
              });
            return text;
          });
        },
      },
      {
        name: "Show Obsidian version",
        desc: "Append the Obsidian version at the end of the window title.",
        visible: () => this.plugin.settings.titleOrder !== "default",
        render: (setting: Setting) => {
          setting.addToggle((toggle) => {
            toggle
              .setValue(this.plugin.settings.showObsidianVersion)
              .onChange(async (value) => {
                this.plugin.settings.showObsidianVersion = value;
                await this.plugin.saveSettings();
                this.plugin.updateTitle();
              });
            return toggle;
          });
        },
      },
    ];
  }
}
