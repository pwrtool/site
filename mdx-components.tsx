import type { MDXComponents } from "mdx/types";
import { AiFillInfoCircle } from "react-icons/ai";

export function useMDXComponents(): MDXComponents {
  return getMDXComponents();
}

export function getIdFromChildren(children: React.ReactNode): string {
  return (children || "").toString().toLowerCase().replace(/ /g, "-");
}

export function getMDXComponents(): MDXComponents {
  return {
    h1: (props) => <h1 id={getIdFromChildren(props.children)} {...props} />,
    h2: (props) => <h2 id={getIdFromChildren(props.children)} {...props} />,
    h3: (props) => <h3 id={getIdFromChildren(props.children)} {...props} />,
    h4: (props) => <h4 id={getIdFromChildren(props.children)} {...props} />,
    p: (props) => <p {...props} />,
    Info: (props) => (
      <div className="flex flex-row bg-blue-500 text-blue-500 align-middle">
        <AiFillInfoCircle size={20} className="m-2 text-center align-middle" />
        {props.children}
      </div>
    ),
    Warning: (props) => <p>Not Implemented</p>,
    Danger: (props) => <p>Not Implemented</p>,
  };
}
