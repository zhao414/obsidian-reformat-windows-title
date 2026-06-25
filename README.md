# Reformat Windows Title

Customize the Obsidian window title format by reordering the vault name and file name.

## Features

- Choose whether the file name or vault name appears first in the window title
- Customize the separator between the vault name and file name
- Optionally append the Obsidian version at the end of the title

## Examples

| Setting | Output |
|---------|--------|
| File name first, ` - ` | `My Note - MyVault` |
| Vault name first, ` \| ` | `MyVault \| My Note` |
| Vault name first, ` - ` + version | `MyVault - My Note - Obsidian 1.13.1` |
| Use default | `My Note - MyVault - Obsidian 1.13.1` |

## Installation

Install from the Obsidian Community Plugins browser, or build manually:

```bash
git clone https://github.com/zhao414/reformat-windows-title
cd reformat-windows-title
npm install
npm run build
```

Copy `main.js`, `manifest.json`, and `styles.css` to your vault's `.obsidian/plugins/reformat-windows-title/` folder.

## Settings

- **Title order** — File name first / Vault name first / Use default
- **Separator** — Custom text to place between the vault and file names
- **Show Obsidian version** — Toggle to append `Obsidian x.x.x` at the end

## Compatibility

- Minimum Obsidian version: **1.5.0**
- Desktop only (uses Electron APIs)
- No network requests, no telemetry, no external file access

## License

MIT

## Support

If this plugin makes your daily life with Obsidian easier, consider buying me a coffee https://ko-fi.com/zhao414

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/I3E121X4Y7)

May the passion be with you!

