# 📘 Documenter

**Documenter** is a browser-based React + Vite tool that analyzes JavaScript and TypeScript files inside a `project/` folder, extracts all function definitions, and maps their usages across the entire codebase.

It also supports `.docignore` to exclude folders from scanning and provides clickable links to open function definitions and usages directly in **VS Code**.

---

## ✨ Features

- 🔍 **Function Discovery** — Detects all function declarations and expressions.
- 📎 **Usage Tracking** — Finds where each function is used across all files.
- ⚠️ **Duplicate Warning** — Warns if functions with the same name exist in different files.
- 🧭 **VS Code Deep Linking** — Click to open functions and usage lines directly in VS Code.
- 🚫 **Ignore Support** — Use `.docignore` to skip folders from analysis.

---

## 🗂️ Folder Structure

```
/project/              # Folder containing your source files
/.docignore            # Optional: folders to ignore (relative to /project)
/src/
  components/          # UI subcomponents
  utils/               # Extraction and scanning logic
  FileViewer.tsx       # Main component
```

---

## 🚀 Getting Started

### 1. Clone and install

```bash
git clone https://github.com/your-username/documenter.git
cd documenter
npm install
```

### 2. Start development server

```bash
npm run dev
```

---

## 🧪 Usage

1. Place `.js` and `.ts` files in the `project/` directory (create it if not present).
2. Optionally, update `.docignore` file in the root folder to ignore specific folders:

```
# .docignore
node_modules
dist
legacy_code
```

3. Open your browser at `http://localhost:5173`.
4. Search functions, browse definitions, see usages, and jump to code using **VS Code** links like:

```
vscode://file/C:/Users/you/Projects/Documenter/project/utils/helpers.ts:42
```

> Tip: If VS Code links don't open directly, ensure [vscode:// protocol](https://code.visualstudio.com/docs/editor/command-line#_opening-vs-code-with-urls) is registered with your system.

---

## 🧠 Tech Stack

- ⚛️ React (with TypeScript)
- ⚡ Vite (uses `import.meta.glob`)
- 🧠 Static regex-based parsing

---

## 📌 Limitations

- Only `.js` and `.ts` files are scanned.
- `.docignore` supports only exact relative folder names (no glob patterns).
- Uses simple regex-based function and usage scanning, not a full AST parser.

---

## 🧱 Example

Given a folder like:

```
project/
  utils/
    helpers.ts   // contains function 'sum'
  core/
    main.ts      // uses 'sum'
```

You’ll see:

- `sum` defined in `/utils/helpers.ts` (line X)
- Used in `/core/main.ts` (line Y)

And all links are clickable to open directly in your editor.

---

## 📄 License

MIT © Arpan Mandal

---

## 💡 Future Enhancements

- [ ] AST parsing for improved accuracy
- [ ] File- and extension-level ignore support
- [ ] Export as Markdown / JSON
- [ ] Call hierarchy mapping
- [ ] Support for class methods and arrow functions in complex contexts

---

## 🧠 Credits

Built with love to help developers explore and understand large codebases faster, with minimal config and full VS Code integration.

