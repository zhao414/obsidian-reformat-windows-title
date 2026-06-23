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

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl)
      .setName("Title order")
      .setDesc("Choose whether the file name or vault name appears first in the window title.")
      .addDropdown((dropdown) =>
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
            this.display();
          }),
      );

    new Setting(containerEl)
      .setName("Separator")
      .setDesc("The text used between the vault name and file name.")
      .addText((text) => {
        text
          .setPlaceholder(" - ")
          .setValue(this.plugin.settings.separator)
          .onChange(async (value) => {
            this.plugin.settings.separator = value;
            await this.plugin.saveSettings();
            this.plugin.updateTitle();
          });
        if (this.plugin.settings.titleOrder === "default") {
          text.setDisabled(true);
        }
        return text;
      });

    new Setting(containerEl)
      .setName("Show Obsidian version")
      .setDesc("Append the Obsidian version at the end of the window title.")
      .addToggle((toggle) => {
        toggle
          .setValue(this.plugin.settings.showObsidianVersion)
          .onChange(async (value) => {
            this.plugin.settings.showObsidianVersion = value;
            await this.plugin.saveSettings();
            this.plugin.updateTitle();
          });
        if (this.plugin.settings.titleOrder === "default") {
          toggle.setDisabled(true);
        }
        return toggle;
      });
  }
}
