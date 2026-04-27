"use client";
import { CodeMirrorEditor, diffSourcePlugin, DiffSourceToggleWrapper, InsertTable, MDXEditor, prop, SandpackConfig } from "@mdxeditor/editor";

//list of plugins
import {
  toolbarPlugin,
  codeBlockPlugin,
  listsPlugin,
  quotePlugin,
  tablePlugin,
  linkDialogPlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  headingsPlugin,
  codeMirrorPlugin,
  sandpackPlugin,
} from "@mdxeditor/editor";

//list of items it toolbar
import {
  UndoRedo,
  BlockTypeSelect,
  ListsToggle,
  Separator,
  CodeToggle,
  InsertThematicBreak,
  BoldItalicUnderlineToggles,
  InsertCodeBlock,
} from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css";

const sandpackConfig: SandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live react",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
    },
  ],
};

function App() {
  return (
    <>
      {" "}
      <MDXEditor
        markdown=""
        contentEditableClassName="prose"
        onChange={(md) => {
          console.log(md);
        }}
        plugins={[
          tablePlugin(),
          headingsPlugin(),
          listsPlugin(),
          diffSourcePlugin(),
          linkDialogPlugin(),
          quotePlugin(),
          codeBlockPlugin({
            codeBlockEditorDescriptors: [
              { priority: -10, match: (_) => true, Editor: CodeMirrorEditor },
            ],
          }),
          sandpackPlugin({ sandpackConfig: sandpackConfig }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              jsx: "JavaScript (react)",
              js: "JavaScript",
              css: "CSS",
              tsx: "TypeScript (react)",
            },
          }),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          toolbarPlugin({
            // toolbarClassName: "prose max-w-none",
            toolbarContents: () => (
              <DiffSourceToggleWrapper>
                <UndoRedo />
                <Separator />
                <BoldItalicUnderlineToggles />
                <CodeToggle />
                <Separator />
                <BlockTypeSelect />
                <Separator />
                <ListsToggle />
                <Separator />
                <InsertTable />
                <InsertThematicBreak />
                <InsertCodeBlock />

                {/* <ChangeAdmonitionType /> */}
              </DiffSourceToggleWrapper>
            ),
          }),
        ]}
      />
    </>
  );
}

export default App;
