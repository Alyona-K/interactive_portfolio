import { createPortal } from "react-dom";
import { ReactNode } from "react";

interface PortalProps {
  children: ReactNode;
}

export const Portal = ({ children }: PortalProps) => {
  const root = document.getElementById("portal-root");
  if (!root) return null;

  return createPortal(children, root);
};
