import { Plugin, View, WorkspaceWindow, apiVersion } from "obsidian";
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

    this.registerEvent(
      this.app.workspace.on("layout-change", () => {
        window.setTimeout(() => this.updateTitle(), 0);
      }),
    );

    this.registerEvent(
      this.app.workspace.on("window-open", (win: WorkspaceWindow) => {
        this.updatePopoutTitle(win);
        win.on("active-leaf-change", () => {
          this.updatePopoutTitle(win);
        });
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
    const title = formatTitle(
      this.settings,
      vaultName,
      fileName,
      apiVersion,
    );
    if (activeDocument.title !== title) {
      activeDocument.title = title;
    }
  }

  updatePopoutTitle(win: WorkspaceWindow) {
    const vaultName = this.app.vault.getName();
    const titleEl = win.doc.querySelector(".view-header-title");
    const fileName = titleEl instanceof HTMLElement ? titleEl.textContent ?? undefined : undefined;
    const title = formatTitle(
      this.settings,
      vaultName,
      fileName,
      apiVersion,
    );
    if (win.doc.title !== title) {
      win.doc.title = title;
    }
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<TitleSettings>);
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
