"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CodeMirrorEditor,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  InsertTable,
  MDXEditor,
  SandpackConfig,
} from "@mdxeditor/editor";

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
import React, { useState } from "react";
import { createWiki } from "../api/project-api";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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

const CreateDocumentation = () => {
  const { projectId } = useParams<{ projectId: string | any }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [getTitle, setTitle] = useState<string>("");
  const [getContent, setContent] = useState("");
  const data = { title: getTitle, content: getContent };

  const handleCreateWiki = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const response = await createWiki(event, projectId, data);

    if (response.status === 200) {
      toast({ title: response.data, description: "Wiki has been created" });
      navigate(`/project/${projectId}/overview/doc`);
    } else {
      toast({
        title: "unable to create wiki",
        description: response.response.data,
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <div>
        <div className="flex w-full items-center space-x-2 pb-2">
          <Label className="mr-2 text-md">Title</Label>
          <Input
            type="title"
            onChange={(ex) => setTitle(ex.target.value)}
            placeholder="write the title in here..."
          />
        </div>
        <div className="border overflow-y-auto 2xl:max-h-[600px] lg:h-[426px] md:h-[350px]">
          <MDXEditor
            markdown=""
            contentEditableClassName="prose"
            onChange={(md) => {
              setContent(md);
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
                  {
                    priority: -10,
                    match: (_) => true,
                    Editor: CodeMirrorEditor,
                  },
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
        </div>
        <div className="flex justify-end pt-2">
          <Button type="submit" variant="default" onClick={handleCreateWiki}>
            Create Wiki
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateDocumentation;
