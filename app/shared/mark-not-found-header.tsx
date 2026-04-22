"use client";

import { useLayoutEffect } from "react";

/** Lets `Header` switch to dark nav / default logo while global `not-found` is shown (URL may not be `/not-found`). */
export const NOT_FOUND_HEADER_ATTR = "data-not-found-header";

export function MarkNotFoundForHeader() {
  useLayoutEffect(() => {
    document.documentElement.setAttribute(NOT_FOUND_HEADER_ATTR, "");
    return () => document.documentElement.removeAttribute(NOT_FOUND_HEADER_ATTR);
  }, []);
  return null;
}
