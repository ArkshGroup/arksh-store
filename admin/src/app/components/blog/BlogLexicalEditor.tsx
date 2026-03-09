"use client";

import React, { useEffect, useRef } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode, registerRichText, $createHeadingNode } from "@lexical/rich-text";
import { ListNode, ListItemNode, registerList } from "@lexical/list";
import { $setBlocksType } from "@lexical/selection";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import {
  $getSelection,
  $getRoot,
  $insertNodes,
  $createParagraphNode,
  FORMAT_TEXT_COMMAND,
  $isRangeSelection,
} from "lexical";
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list";

const theme = {
  paragraph: "mb-2",
  heading: {
    h1: "text-2xl font-bold mb-2",
    h2: "text-xl font-semibold mb-2",
    h3: "text-lg font-medium mb-2",
  },
  list: {
    ul: "list-disc list-inside mb-2",
    ol: "list-decimal list-inside mb-2",
    listitem: "ml-2",
  },
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
  },
};

const initialConfig = {
  namespace: "BlogEditor",
  theme,
  onError: (err: Error) => console.error("Lexical error:", err),
  nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode],
};

// Plugin: register rich text + list behavior
function RegisterPlugins() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    const unregisterRich = registerRichText(editor);
    const unregisterList = registerList(editor);
    return () => {
      unregisterRich();
      unregisterList();
    };
  }, [editor]);
  return null;
}

// Plugin: set initial HTML when value is provided
function InitialHtmlPlugin({ initialHtml }: { initialHtml: string }) {
  const [editor] = useLexicalComposerContext();
  const lastInitial = useRef<string>("");
  useEffect(() => {
    if (!initialHtml?.trim()) return;
    // Re-run when initialHtml changes (e.g. edit form reset with loaded blog content)
    if (lastInitial.current === initialHtml) return;
    lastInitial.current = initialHtml;
    editor.update(() => {
      const root = $getRoot();
      const parser = new DOMParser();
      const dom = parser.parseFromString(initialHtml, "text/html");
      const nodes = $generateNodesFromDOM(editor, dom);
      if (nodes.length) {
        root.clear();
        $insertNodes(nodes);
      }
    });
  }, [editor, initialHtml]);
  return null;
}

// Plugin: on change -> output HTML
function OnChangeHtmlPlugin({ onChange }: { onChange: (html: string) => void }) {
  const [editor] = useLexicalComposerContext();
  return (
    <OnChangePlugin
      ignoreSelectionChange
      onChange={() => {
        editor.read(() => {
          try {
            const html = $generateHtmlFromNodes(editor, null);
            onChange(html);
          } catch (e) {
            console.error("Lexical HTML export error:", e);
          }
        });
      }}
    />
  );
}

// Toolbar
function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const formatHeading = (tag: "h1" | "h2" | "h3") => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;
      $setBlocksType(selection, () => $createHeadingNode(tag));
    });
  };

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;
      $setBlocksType(selection, () => $createParagraphNode());
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border border-gray6 rounded-t-md bg-gray-50 border-b-0">
      <select
        className="text-sm border border-gray6 rounded px-2 py-1 bg-white"
        onChange={(e) => {
          const v = e.target.value;
          if (v === "p") formatParagraph();
          else if (v === "h1" || v === "h2" || v === "h3") formatHeading(v);
        }}
      >
        <option value="p">Paragraph</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
      </select>
      <button
        type="button"
        className="px-2 py-1 rounded border border-gray6 bg-white text-sm font-bold hover:bg-gray-100"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        title="Bold"
      >
        B
      </button>
      <button
        type="button"
        className="px-2 py-1 rounded border border-gray6 bg-white text-sm italic hover:bg-gray-100"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        title="Italic"
      >
        I
      </button>
      <button
        type="button"
        className="px-2 py-1 rounded border border-gray6 bg-white text-sm hover:bg-gray-100"
        onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
        title="Bullet list"
      >
        • List
      </button>
      <button
        type="button"
        className="px-2 py-1 rounded border border-gray6 bg-white text-sm hover:bg-gray-100"
        onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
        title="Numbered list"
      >
        1. List
      </button>
    </div>
  );
}

type BlogLexicalEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export default function BlogLexicalEditor({
  value,
  onChange,
  placeholder = "Write your blog content…",
}: BlogLexicalEditorProps) {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RegisterPlugins />
      <InitialHtmlPlugin initialHtml={value} />
      <OnChangeHtmlPlugin onChange={onChange} />
      <ToolbarPlugin />
      <div className="border border-gray6 rounded-b-md overflow-hidden relative">
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="min-h-[240px] w-full resize-y p-4 text-base outline-none prose prose-sm max-w-none"
              aria-placeholder={placeholder}
              placeholder={undefined as any}
            />
          }
          placeholder={
            <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
              {placeholder}
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
      <HistoryPlugin />
    </LexicalComposer>
  );
}
