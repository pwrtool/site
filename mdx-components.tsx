import type { MDXComponents } from "mdx/types";

export function useMDXComponents(): MDXComponents {
  return getMDXComponents();
}

export function getIdFromChildren(children: React.ReactNode): string {
  return (children || "").toString().toLowerCase().replace(/ /g, "-");
}

function getMDXComponents(): MDXComponents {
  return {
    h1: (props) => <h1 id={getIdFromChildren(props.children)} {...props} />,
    h2: (props) => <h2 id={getIdFromChildren(props.children)} {...props} />,
    h3: (props) => <h3 id={getIdFromChildren(props.children)} {...props} />,
    h4: (props) => <h4 id={getIdFromChildren(props.children)} {...props} />,
    p: (props) => <p {...props} />,
  };
}
