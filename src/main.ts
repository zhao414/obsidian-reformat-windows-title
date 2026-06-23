import { Plugin, View, apiVersion } from "obsidian";
import {
  type TitleSettings,
  DEFAULT_SETTINGS,
  TitleSettingTab,
} from "./settings";
import { formatTitle } from "./title-formatter";

export default class ReformatWindowsTitlePlugin extends Plugin {
  settings: TitleSettings = DEFAULT_SETTINGS;

  async onload() {
    await this.loadSettings();

    this.addSettingTab(new TitleSettingTab(this.app, this));

    this.registerEvent(
      this.app.workspace.on("active-leaf-change", () => {
        this.updateTitle();
      }),
    );

    this.updateTitle();
  }

  onunload() {
    activeDocument.title = this.app.vault.getName();
  }

  updateTitle() {
    const vaultName = this.app.vault.getName();
    const view = this.app.workspace.getActiveViewOfType(View);
    const fileName = view?.getDisplayText();
    activeDocument.title = formatTitle(
      this.settings,
      vaultName,
      fileName,
      apiVersion,
    );
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
