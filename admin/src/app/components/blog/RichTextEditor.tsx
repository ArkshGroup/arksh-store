"use client";

import React, { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

const btnClass =
  "p-1.5 rounded border-0 bg-transparent text-gray-600 hover:bg-gray-200 hover:text-gray-900 disabled:opacity-40";
const btnActiveClass = "bg-gray-200 text-gray-900";

function MenuBar({ editor }: { editor: ReturnType<typeof useEditor> }) {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);

  if (!editor) return null;

  const setLink = () => {
    if (!linkUrl.trim()) return;
    editor.chain().focus().setLink({ href: linkUrl }).run();
    setLinkUrl("");
    setShowLinkInput(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-0.5 p-2 border border-gray6 rounded-t-md bg-white border-b-0">
      {/* Heading dropdown */}
      <select
        className="text-sm border-0 rounded px-2 py-1 bg-transparent text-gray-600 hover:bg-gray-100 cursor-pointer"
        value=""
        onChange={(e) => {
          const v = e.target.value;
          if (v === "p") editor.chain().focus().setParagraph().run();
          else if (v === "h1") editor.chain().focus().toggleHeading({ level: 1 }).run();
          else if (v === "h2") editor.chain().focus().toggleHeading({ level: 2 }).run();
          else if (v === "h3") editor.chain().focus().toggleHeading({ level: 3 }).run();
        }}
      >
        <option value="">H</option>
        <option value="p">Paragraph</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
      </select>

      <span className="w-px h-5 bg-gray-200 mx-0.5" />

      {/* List dropdown */}
      <select
        className="text-sm border-0 rounded px-2 py-1 bg-transparent text-gray-600 hover:bg-gray-100 cursor-pointer"
        value=""
        onChange={(e) => {
          const v = e.target.value;
          if (v === "ul") editor.chain().focus().toggleBulletList().run();
          else if (v === "ol") editor.chain().focus().toggleOrderedList().run();
        }}
      >
        <option value="">List</option>
        <option value="ul">Bullet list</option>
        <option value="ol">Numbered list</option>
      </select>

      <span className="w-px h-5 bg-gray-200 mx-0.5" />

      {/* Undo / Redo */}
      <button
        type="button"
        className={btnClass}
        onClick={() => editor.chain().focus().undo().run()}
        title="Undo"
        disabled={!editor.can().undo()}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </svg>
      </button>
      <button
        type="button"
        className={btnClass}
        onClick={() => editor.chain().focus().redo().run()}
        title="Redo"
        disabled={!editor.can().redo()}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
        </svg>
      </button>

      <span className="w-px h-5 bg-gray-200 mx-0.5" />

      {/* Bold, Italic, Strikethrough, Underline */}
      <button
        type="button"
        className={`${btnClass} font-bold ${editor.isActive("bold") ? btnActiveClass : ""}`}
        onClick={() => editor.chain().focus().toggleBold().run()}
        title="Bold"
      >
        B
      </button>
      <button
        type="button"
        className={`${btnClass} italic ${editor.isActive("italic") ? btnActiveClass : ""}`}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        title="Italic"
      >
        I
      </button>
      <button
        type="button"
        className={`${btnClass} line-through ${editor.isActive("strike") ? btnActiveClass : ""}`}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        title="Strikethrough"
      >
        S
      </button>
      <button
        type="button"
        className={`${btnClass} underline ${editor.isActive("underline") ? btnActiveClass : ""}`}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        title="Underline"
      >
        U
      </button>

      <span className="w-px h-5 bg-gray-200 mx-0.5" />

      {/* Link */}
      <div className="relative inline-block">
        <button
          type="button"
          className={`${btnClass} ${editor.isActive("link") ? btnActiveClass : ""}`}
          onClick={() => setShowLinkInput((v) => !v)}
          title="Link"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </button>
        {showLinkInput && (
          <div className="absolute left-0 top-full mt-1 p-2 bg-white border border-gray6 rounded shadow-lg z-10 flex items-center gap-1">
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://"
              className="text-sm border border-gray6 rounded px-2 py-1 w-48"
              onKeyDown={(e) => e.key === "Enter" && setLink()}
            />
            <button type="button" className="text-sm px-2 py-1 bg-gray-100 rounded hover:bg-gray-200" onClick={setLink}>
              Apply
            </button>
            <button
              type="button"
              className="text-sm px-2 py-1 text-gray-500 hover:bg-gray-100 rounded"
              onClick={() => editor.chain().focus().unsetLink().run()}
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Code */}
      <button
        type="button"
        className={`${btnClass} font-mono text-xs ${editor.isActive("code") ? btnActiveClass : ""}`}
        onClick={() => editor.chain().focus().toggleCode().run()}
        title="Inline code"
      >
        {"</>"}
      </button>

      <span className="w-px h-5 bg-gray-200 mx-0.5" />

      {/* Text alignment */}
      <button
        type="button"
        className={`${btnClass} ${editor.isActive({ textAlign: "left" }) ? btnActiveClass : ""}`}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        title="Align left"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 5h16v2H4V5zm0 4h10v2H4V9zm0 4h16v2H4v-2zm0 4h10v2H4v-2z" />
        </svg>
      </button>
      <button
        type="button"
        className={`${btnClass} ${editor.isActive({ textAlign: "center" }) ? btnActiveClass : ""}`}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        title="Align center"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 5h16v2H4V5zm2 4h12v2H6V9zm-2 4h16v2H4v-2zm2 4h12v2H6v-2z" />
        </svg>
      </button>
      <button
        type="button"
        className={`${btnClass} ${editor.isActive({ textAlign: "right" }) ? btnActiveClass : ""}`}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        title="Align right"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 5h16v2H4V5zm4 4h12v2H8V9zm-4 4h16v2H4v-2zm4 4h12v2H8v-2z" />
        </svg>
      </button>
      <button
        type="button"
        className={`${btnClass} ${editor.isActive({ textAlign: "justify" }) ? btnActiveClass : ""}`}
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        title="Justify"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 5h16v2H4V5zm0 4h16v2H4V9zm0 4h16v2H4v-2zm0 4h16v2H4v-2z" />
        </svg>
      </button>

      <span className="w-px h-5 bg-gray-200 mx-0.5" />

      {/* Text color (Aa) */}
      <div className="relative inline-block">
        <button
          type="button"
          className={`${btnClass} ${showColorPicker ? btnActiveClass : ""}`}
          onClick={() => setShowColorPicker((v) => !v)}
          title="Text color"
        >
          <span className="text-sm font-semibold">Aa</span>
        </button>
        {showColorPicker && (
          <div className="absolute left-0 top-full mt-1 p-2 bg-white border border-gray6 rounded shadow-lg z-10">
            <p className="text-tiny text-gray-500 mb-1">Text color</p>
            <div className="flex flex-wrap gap-1">
              {["#000000", "#dc2626", "#ea580c", "#ca8a04", "#16a34a", "#2563eb", "#7c3aed", "#db2777"].map((c) => (
                <button
                  key={c}
                  type="button"
                  className="w-6 h-6 rounded border border-gray6"
                  style={{ backgroundColor: c }}
                  onClick={() => {
                    editor.chain().focus().setColor(c).run();
                    setShowColorPicker(false);
                  }}
                  title={c}
                />
              ))}
            </div>
            <button
              type="button"
              className="mt-1 text-tiny text-gray-500 hover:underline"
              onClick={() => editor.chain().focus().unsetColor().run()}
            >
              Reset
            </button>
          </div>
        )}
      </div>

      {/* Highlight */}
      <button
        type="button"
        className={`${btnClass} ${editor.isActive("highlight") ? btnActiveClass : ""}`}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        title="Highlight"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>
    </div>
  );
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your content…",
}: RichTextEditorProps) {
  const valueRef = useRef(value);
  const [isEmpty, setIsEmpty] = useState(true);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: false }),
      Underline,
      TextStyle,
      Color,
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "min-h-[240px] w-full resize-y p-4 text-base outline-none prose prose-sm max-w-none",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      valueRef.current = html;
      setIsEmpty(editor.isEmpty);
      onChange(html);
    },
  });

  // Sync external value (e.g. loaded product/blog content) into editor
  useEffect(() => {
    if (!editor) return;
    const trimmed = (value || "").trim();
    if (trimmed && trimmed !== valueRef.current) {
      valueRef.current = trimmed;
      editor.commands.setContent(trimmed);
      setIsEmpty(editor.isEmpty);
    } else if (!trimmed) {
      setIsEmpty(editor.isEmpty);
    }
  }, [value, editor]);

  return (
    <div>
      <MenuBar editor={editor} />
      <div className="border border-gray6 rounded-b-md overflow-hidden relative [&_.ProseMirror]:min-h-[240px] [&_.ProseMirror]:p-4 [&_.ProseMirror]:outline-none">
        <EditorContent editor={editor} />
        {placeholder && isEmpty && editor && (
          <div
            className="absolute top-4 left-4 text-gray-400 pointer-events-none"
            aria-hidden
          >
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
}
