declare module "react-pdf" {
  import type { ComponentType, ReactNode } from "react";

  export const pdfjs: {
    version: string;
    GlobalWorkerOptions: { workerSrc: string };
  };
  export const Document: ComponentType<{
    file: string;
    onLoadSuccess?: (info: { numPages: number }) => void;
    className?: string;
    children?: ReactNode;
  }>;
  export const Page: ComponentType<{
    pageNumber: number;
    className?: string;
    width?: number;
  }>;
}
