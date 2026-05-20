# Add Interactive CLI Terminal for XAMPP Services

We want to add a feature in the XAMPP Manager VS Code extension where users can type commands in a terminal to start and stop Apache and MariaDB services, and open the phpMyAdmin panel.

In addition, we want to allow users to type `meta panel` in a standard VS Code integrated terminal (such as CMD or PowerShell) to automatically pop open the custom **Meta Panel CLI** terminal.

## Proposed Changes

### Script Files & Environment Setup

When the extension activates:
1. **Generate `meta.bat`** (for Windows CMD/PowerShell) and **`meta`** (for Unix shell) in the workspace root.
2. These scripts will write the command `"open"` to a hidden trigger file `.meta-panel-trigger` in the workspace root when run as `meta panel`.
3. Prepend the workspace path to the integrated terminal's `PATH` environment variable using `context.environmentVariableCollection`. This allows the terminal to resolve the `meta` command from any subdirectory.
4. Auto-append `.meta-panel-trigger`, `meta.bat`, and `meta` to the workspace's `.gitignore` file to prevent dirtying the git repository status.

### File Watcher in Extension

1. In `activate()`, use `vscode.RelativePattern` to watch for changes to `.meta-panel-trigger` in the workspace root.
2. When the trigger file is created or changed, read the content. If it says `"open"`, trigger `createCliTerminal()` and delete the trigger file immediately.

---

### Configuration / Command Registration

#### [MODIFY] [package.json](file:///c:/xampp/htdocs/XampManager/xampp-manager/package.json)

- Register the new command `xampp.openCliTerminal`. (Completed)

---

### Core Logic

#### [MODIFY] [extension.ts](file:///c:/xampp/htdocs/XampManager/xampp-manager/src/extension.ts)

- Implement the file writing, PATH environment integration, and FileSystemWatcher inside `activate(context)`.

---

## Verification Plan

### Manual Verification
1. Launch the VS Code Extension Host.
2. In the default integrated terminal (e.g. PowerShell or CMD), type `meta panel`.
3. Verify that the **Meta Panel CLI** terminal immediately pops open in VS Code.
4. Verify that `.gitignore` in the workspace contains the ignored scripts/triggers.
