"use client";

import {
  type BundledLanguage,
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
  type CodeBlockProps,
  CodeBlockSelect,
  CodeBlockSelectContent,
  CodeBlockSelectItem,
  CodeBlockSelectTrigger,
  CodeBlockSelectValue,
} from "@/components/ui/kibo-ui/code-block";
import type { HTMLAttributes } from "react";
import { memo } from "react";
import ReactMarkdown, { type Options } from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

export type AIResponseProps = HTMLAttributes<HTMLDivElement> & {
  options?: Options;
  children: Options["children"];
};

const components: Options["components"] = {
  ol: ({ children, className, ...props }) => (
    <ol className={cn("ml-4 list-outside list-decimal", className)} {...props}>
      {children}
    </ol>
  ),
  li: ({ children, className, ...props }) => (
    <li className={cn("py-1", className)} {...props}>
      {children}
    </li>
  ),
  ul: ({ children, className, ...props }) => (
    <ul className={cn("ml-4 list-outside list-disc", className)} {...props}>
      {children}
    </ul>
  ),
  strong: ({ children, className, ...props }) => (
    <span className={cn("font-semibold", className)} {...props}>
      {children}
    </span>
  ),
  a: ({ children, className, ...props }) => (
    <a
      className={cn("font-medium text-primary underline", className)}
      rel="noreferrer"
      target="_blank"
      {...props}
    >
      {children}
    </a>
  ),
  h1: ({ children, className, ...props }) => (
    <h1
      className={cn("mt-6 mb-2 font-semibold text-3xl", className)}
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, className, ...props }) => (
    <h2
      className={cn("mt-6 mb-2 font-semibold text-2xl", className)}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, className, ...props }) => (
    <h3 className={cn("mt-6 mb-2 font-semibold text-xl", className)} {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, className, ...props }) => (
    <h4 className={cn("mt-6 mb-2 font-semibold text-lg", className)} {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, className, ...props }) => (
    <h5
      className={cn("mt-6 mb-2 font-semibold text-base", className)}
      {...props}
    >
      {children}
    </h5>
  ),
  h6: ({ children, className, ...props }) => (
    <h6 className={cn("mt-6 mb-2 font-semibold text-sm", className)} {...props}>
      {children}
    </h6>
  ),
  table: ({ children, className, ...props }) => (
    <div className="my-4 max-w-[500px] overflow-x-auto rounded-lg border border-border shadow-sm">
      <table
        className={cn(
          "w-max min-w-full border-collapse text-left bg-background",
          "border-separate border-spacing-0",
          className
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children, className, ...props }) => (
    <thead
      className={cn(
        "bg-secondary/70 sticky top-0 z-10",
        "border-b-2 border-border",
        className
      )}
      {...props}
    >
      {children}
    </thead>
  ),
  tbody: ({ children, className, ...props }) => (
    <tbody
      className={cn(
        "divide-y divide-border/60 bg-background",
        "[&>tr:hover]:bg-muted/50 [&>tr]:transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </tbody>
  ),
  tr: ({ children, className, ...props }) => (
    <tr
      className={cn(
        "border-b border-border/40 hover:bg-muted/30",
        "transition-colors duration-150",
        className
      )}
      {...props}
    >
      {children}
    </tr>
  ),
  th: ({ children, className, ...props }) => (
    <th
      className={cn(
        "px-4 py-2 font-semibold text-left text-foreground",
        "bg-secondary/70 border-r border-border/40 last:border-r-0",
        "text-sm tracking-wide uppercase whitespace-nowrap",
        "first:rounded-tl-lg last:rounded-tr-lg",
        "sticky top-0 z-10",
        className
      )}
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, className, ...props }) => (
    <td
      className={cn(
        "px-4 py-2 text-sm text-foreground",
        "border-r border-border/20 last:border-r-0",
        "whitespace-nowrap",
        className
      )}
      {...props}
    >
      {children}
    </td>
  ),
  blockquote: ({ children, className, ...props }) => (
    <blockquote
      className={cn(
        "border-l-4 border-secondary pl-4 italic text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </blockquote>
  ),
  pre: ({ node, className, children }) => {
    let language = "javascript";

    if (typeof node?.properties?.className === "string") {
      language = node.properties.className.replace("language-", "");
    }

    const childrenIsCode =
      typeof children === "object" &&
      children !== null &&
      "type" in children &&
      children.type === "code";

    if (!childrenIsCode) {
      return (
        <div className="my-4 max-w-[500px] overflow-x-auto">
          <pre className={cn("whitespace-pre-wrap", className)}>{children}</pre>
        </div>
      );
    }

    const codeContent = (children.props as { children: string }).children;

    const data: CodeBlockProps["data"] = [
      {
        language: language as BundledLanguage,
        filename: `index.${getFileExtension(language)}`,
        code: codeContent,
      },
    ];

    return (
      <div className="my-4 max-w-[500px] overflow-x-auto">
        <CodeBlock
          className={cn("h-auto", className)}
          data={data}
          defaultValue={data[0].language}
        >
          <CodeBlockHeader>
            <CodeBlockFiles>
              {(item) => (
                <CodeBlockFilename key={item.language} value={item.language}>
                  {item.filename}
                </CodeBlockFilename>
              )}
            </CodeBlockFiles>
            <CodeBlockSelect>
              <CodeBlockSelectTrigger>
                <CodeBlockSelectValue />
              </CodeBlockSelectTrigger>
              <CodeBlockSelectContent>
                {(item) => (
                  <CodeBlockSelectItem
                    key={item.language}
                    value={item.language}
                  >
                    {item.language}
                  </CodeBlockSelectItem>
                )}
              </CodeBlockSelectContent>
            </CodeBlockSelect>
            <CodeBlockCopyButton
              onCopy={() => console.log("Copied code to clipboard")}
              onError={() => console.error("Failed to copy code to clipboard")}
            />
          </CodeBlockHeader>
          <CodeBlockBody>
            {(item) => (
              <CodeBlockItem key={item.language} value={item.language}>
                <CodeBlockContent language={item.language as BundledLanguage}>
                  {item.code}
                </CodeBlockContent>
              </CodeBlockItem>
            )}
          </CodeBlockBody>
        </CodeBlock>
      </div>
    );
  },
};

// Helper function to get file extension based on language
function getFileExtension(language: string): string {
  const extensions: Record<string, string> = {
    javascript: "js",
    typescript: "ts",
    python: "py",
    java: "java",
    cpp: "cpp",
    c: "c",
    csharp: "cs",
    php: "php",
    ruby: "rb",
    go: "go",
    rust: "rs",
    swift: "swift",
    kotlin: "kt",
    scala: "scala",
    html: "html",
    css: "css",
    scss: "scss",
    less: "less",
    json: "json",
    xml: "xml",
    yaml: "yaml",
    yml: "yml",
    markdown: "md",
    bash: "sh",
    shell: "sh",
    powershell: "ps1",
    sql: "sql",
    dockerfile: "dockerfile",
    jsx: "jsx",
    tsx: "tsx",
  };

  return extensions[language.toLowerCase()] || "txt";
}

export const AIResponse = memo(
  ({ className, options, children, ...props }: AIResponseProps) => (
    <div
      className={cn(
        "size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
        className
      )}
      {...props}
    >
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm]}
        {...options}
      >
        {children}
      </ReactMarkdown>
    </div>
  ),
  (prevProps, nextProps) => prevProps.children === nextProps.children
);

AIResponse.displayName = "AIResponse";
