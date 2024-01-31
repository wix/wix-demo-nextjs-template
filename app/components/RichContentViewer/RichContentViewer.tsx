"use client";
import React from "react";
import { RicosViewer } from "ricos-viewer";
import { RichContent } from 'ricos-schema';
import { toDraft } from "ricos-content/libs/toDraft";
import { pluginDivider } from "wix-rich-content-plugin-divider/viewer";
import { pluginHeadings } from "wix-rich-content-plugin-headings/viewer";
import { pluginImage } from "wix-rich-content-plugin-image/viewer";

const plugins = [
  pluginDivider({
    size: "medium",
  }),
  pluginHeadings(),
  pluginImage(),
];

const RichContentViewer = ({ richContent }: { richContent: RichContent }) => {
  return <RicosViewer content={toDraft(richContent)} plugins={plugins} />;
};

export default RichContentViewer;
