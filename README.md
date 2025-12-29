# Checkbox Display

Checkbox Display is a VS Code extension that detects and renders interactive checkbox patterns in source files and notebooks.

## Features

- Interactive checkboxes for variables and config-like lines (binary and carousel values).
- Supports many languages and Jupyter Notebooks; comment style is detected automatically.
- Clickable CodeLens "Click to toggle" for toggling values, plus keyboard shortcut and command palette support.
- Decorations show ☐/☑ for binary values and circled numbers for carousel entries.
- Value validation diagnostics to warn when a variable's value doesn't match defined carousel options.
- Configurable colors and autosave on toggle.
- Project Sidebar (Checkbox explorer) with search and case-sensitivity option.

## How it works

Write a line with a trailing `[CB]:` specifier listing the two (or more) allowed values separated by `|`:

```python
myFlag = true # [CB]: true|false
mode = "dev" # [CB]: "dev"|"staging"|"prod"
```
```c
bool myFlag = True; # [CB]: True;|False;
char mode[] = "dev"; # [CB]: "dev";|"staging";|"prod";
```

- For binary pairs the extension shows ☐/☑ and toggles between the two values.
- For more than two values it shows a circled index and cycles through the listed values.

Snippets are available (type `cb` or `checkbox`) to insert a pattern quickly.

## Commands & Shortcuts

- `Toggle Checkbox` — toggles the checkbox under the cursor (Command Palette).
- Default shortcut: `Cmd+Shift+C` (macOS) / `Ctrl+Shift+C` (Windows/Linux).

## Configuration

Settings (contributions in `package.json`):

- `checkbox-display.checkedColor`: color for checked decoration.
- `checkbox-display.uncheckedColor`: color for unchecked decoration.
- `checkbox-display.carouselColor`: color for carousel indicator.
- `checkbox-display.autoSave` (boolean, default: `false`): save file automatically after toggle.
- `checkbox-display.sidebarCaseSensitive` (boolean): case sensitivity in the Checkbox explorer.

## Development

1. Clone the repository and open it in VS Code.
2. Install dependencies:

```bash
npm install
```

3. Run in debug: press `F5` to open an Extension Development Host.
4. Run tests:

```bash
npm test
```

## Release notes (Changelog)

### 0.0.3

- Added (partially) support for Jupyter Notebooks (not through Checkbox Explorer)
- Added option to display "Click to toggle" Codelens disposable visibility
- Updated decorations to show circled numbers for carousel values and keep ☑/☐ for binary cases
- Added user-configurable colors: `checkbox-display.checkedColor`, `checkbox-display.uncheckedColor`, and `checkbox-display.carouselColor`
- Value validation with diagnostics: warns when variable value doesn't match carousel values
- Auto-save on toggle: added `checkbox-display.autoSave` setting (default: false)
- Project management with Sidebar (Checkbox explorer) with case sensitivity option, and option to search a checkbox


### 0.0.2

- Added support for multiple languages

### 0.0.1

- Initial release

## Tests & Snippets

- Snippets are stored in the `snippets/` folder.
- Tests are under `test/` and can be run with `npm test`.