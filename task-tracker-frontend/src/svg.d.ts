// A declaration file for SVG imports in TypeScript
// allowing them to be imported as React components.
declare module "*.svg?react" {
    import React = require("react");
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }