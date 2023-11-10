"use client";
import Prism from "prismjs";
import { useEffect } from "react";

export default function Highlighter() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return <></>;
}
