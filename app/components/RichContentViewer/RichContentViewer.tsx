"use client";
import React from "react";
import '@wix/ricos/css/all-plugins-viewer.css';
import { quickStartViewerPlugins, RicosViewer } from '@wix/ricos';

const RichContentViewer = ({ content }: { content: any }) => {
  return <RicosViewer content={content} plugins={quickStartViewerPlugins()} />;
};

export default RichContentViewer;
