export type ThemeName = "light" | "dark";
export type EditorTheme = "light" | "dark";
export type PreviewTheme = "github-light" | "github-dark";
export type CodeBlockTheme = "github" | "monokai";

export interface Theme {
  name: ThemeName;
  editorTheme: EditorTheme;
  previewTheme: PreviewTheme;
  codeBlockTheme: CodeBlockTheme;
}

export const Themes: Theme[] = [
  {
    name: "light",
    editorTheme: "light",
    previewTheme: "github-light",
    codeBlockTheme: "github",
  },
  {
    name: "dark",
    editorTheme: "dark",
    previewTheme: "github-dark",
    codeBlockTheme: "monokai",
  },
];

export function setTheme({
  editor,
  themeName,
  baseUri = "./",
}: {
  editor: CodeMirror.Editor;
  themeName: ThemeName;
  baseUri: string;
}) {
  const theme = Themes.find((t) => t.name === themeName);
  if (!theme) {
    return;
  }

  // Set preview theme
  const previewThemeStyleElementID = "crossnote-preview-theme";
  let previewThemeStyleElement: HTMLLinkElement = document.getElementById(
    previewThemeStyleElementID
  ) as HTMLLinkElement;
  if (!previewThemeStyleElement) {
    previewThemeStyleElement = document.createElement(
      "link"
    ) as HTMLLinkElement;
    previewThemeStyleElement.id = previewThemeStyleElementID;
    previewThemeStyleElement.rel = "stylesheet";
    document.head.appendChild(previewThemeStyleElement);
  }
  previewThemeStyleElement.href =
    baseUri + `preview_themes/${theme.previewTheme}.css`;

  // Set code block theme
  const codeBlockThemeStyleElementID = "crossnote-code-block-theme";
  let codeBlockThemeStyleElement: HTMLLinkElement = document.getElementById(
    codeBlockThemeStyleElementID
  ) as HTMLLinkElement;
  if (!codeBlockThemeStyleElement) {
    codeBlockThemeStyleElement = document.createElement(
      "link"
    ) as HTMLLinkElement;
    codeBlockThemeStyleElement.id = codeBlockThemeStyleElementID;
    codeBlockThemeStyleElement.rel = "stylesheet";
    document.head.appendChild(codeBlockThemeStyleElement);
  }
  codeBlockThemeStyleElement.href =
    baseUri + `prism_themes/${theme.codeBlockTheme}.css`;

  // Set editor theme
  const editorThemeStyleElementID = "crossnote-editor-theme";
  let editorThemeStyleElement: HTMLLinkElement = document.getElementById(
    editorThemeStyleElementID
  ) as HTMLLinkElement;
  if (!editorThemeStyleElement) {
    editorThemeStyleElement = document.createElement("link") as HTMLLinkElement;
    editorThemeStyleElement.id = editorThemeStyleElementID;
    editorThemeStyleElement.rel = "stylesheet";
    document.head.appendChild(editorThemeStyleElement);
  }
  editorThemeStyleElement.href =
    baseUri + `editor_themes/${theme.editorTheme}.css`;

  const currentTheme = editor.getOption("theme");
  if (currentTheme !== theme.editorTheme) {
    editor.setOption("theme", theme.editorTheme);
    editor.refresh();
  }
}
