import { Plugin, View } from "obsidian";
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
    document.title = this.app.vault.getName();
  }

  updateTitle() {
    const vaultName = this.app.vault.getName();
    const view = this.app.workspace.getActiveViewOfType(View);
    const fileName = view?.getDisplayText();
    const metaVersion = document.head.querySelector(
      'meta[name="app-version"]',
    );
    const obsidianVersion =
      metaVersion instanceof HTMLMetaElement
        ? metaVersion.content
        : undefined;
    document.title = formatTitle(
      this.settings,
      vaultName,
      fileName,
      obsidianVersion,
    );
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
