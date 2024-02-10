"use client";
import React from "react";
import { DraftContent, RicosViewer } from "ricos-viewer";
import { pluginDivider } from "wix-rich-content-plugin-divider/viewer";
import { pluginHeadings } from "wix-rich-content-plugin-headings/viewer";
import { pluginImage } from "wix-rich-content-plugin-image/viewer";

const plugins = [
  pluginDivider({
    size: "medium",
  }),
  pluginImage(),
  pluginHeadings(),
];

const RichContentViewer = ({ content }: { content: DraftContent }) => {
  return <RicosViewer content={content} plugins={plugins} />;
};

export default RichContentViewer;
