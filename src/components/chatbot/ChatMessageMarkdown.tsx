"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Copy, ShieldCheck, ArrowRight, Calendar, BookOpen } from "lucide-react";

interface ChatMessageMarkdownProps {
  content: string;
}

export function ChatMessageMarkdown({ content }: ChatMessageMarkdownProps) {
  const blocks = splitCodeBlocks(content);

  const hasVerifyLink = content.includes("/verify");
  const hasEventsLink = content.includes("/events");
  const hasCoursesLink = content.includes("/courses");

  return (
    <div className="space-y-2 text-sm leading-relaxed break-words">
      {blocks.map((block, idx) => {
        if (block.type === "code") {
          return <CodeSnippet key={idx} code={block.code} language={block.language} />;
        }
        return <FormattedTextBlock key={idx} text={block.text} />;
      })}

      {/* Interactive Action Cards */}
      {hasVerifyLink && <InChatCertificateLookup />}
      {hasEventsLink && !hasVerifyLink && <InChatEventsCard />}
      {hasCoursesLink && !hasVerifyLink && !hasEventsLink && <InChatCoursesCard />}
    </div>
  );
}

function InChatCertificateLookup() {
  const [certId, setCertId] = useState("");
  const router = useRouter();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (certId.trim()) {
      router.push(`/verify/${certId.trim()}`);
    }
  };

  return (
    <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-emerald-500/10 border border-emerald-500/30 text-xs">
      <div className="flex items-center gap-1.5 font-semibold text-emerald-400 mb-2">
        <ShieldCheck className="size-4" />
        <span>Quick Certificate Verification</span>
      </div>
      <form onSubmit={handleVerify} className="flex gap-2">
        <input
          type="text"
          value={certId}
          onChange={(e) => setCertId(e.target.value)}
          placeholder="e.g. CCCUH-INT-2026-0001"
          className="flex-1 bg-background text-foreground text-xs px-2.5 py-1.5 rounded-lg border border-border focus:outline-none focus:ring-1 focus:ring-emerald-400 font-mono"
        />
        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shrink-0"
        >
          <span>Verify</span>
          <ArrowRight className="size-3" />
        </button>
      </form>
    </div>
  );
}

function InChatEventsCard() {
  return (
    <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-violet-500/10 via-purple-500/5 to-indigo-500/10 border border-violet-500/30 text-xs flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <div className="size-8 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center shrink-0">
          <Calendar className="size-4" />
        </div>
        <div>
          <p className="font-semibold text-foreground">Explore Campus Events</p>
          <p className="text-[11px] text-muted-foreground">Hackathons, Code Sprints & Talks</p>
        </div>
      </div>
      <Link
        href="/events"
        className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium text-[11px] inline-flex items-center gap-1 transition-colors shrink-0"
      >
        <span>View Events</span>
        <ArrowRight className="size-3" />
      </Link>
    </div>
  );
}

function InChatCoursesCard() {
  return (
    <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-blue-500/10 via-sky-500/5 to-cyan-500/10 border border-blue-500/30 text-xs flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <div className="size-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
          <BookOpen className="size-4" />
        </div>
        <div>
          <p className="font-semibold text-foreground">Coding Masterclasses</p>
          <p className="text-[11px] text-muted-foreground">Python, Web Dev, DSA & Bootcamps</p>
        </div>
      </div>
      <Link
        href="/courses"
        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-[11px] inline-flex items-center gap-1 transition-colors shrink-0"
      >
        <span>Courses</span>
        <ArrowRight className="size-3" />
      </Link>
    </div>
  );
}

function CodeSnippet({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div className="my-2 rounded-xl overflow-hidden border border-border/80 bg-zinc-950 text-zinc-100 font-mono text-xs shadow-md">
      <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900 border-b border-zinc-800 text-zinc-400">
        <span className="uppercase text-[10px] tracking-wider font-semibold text-primary/80">
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-zinc-200 transition-colors py-0.5 px-2 rounded-md hover:bg-zinc-800"
          title="Copy code"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span className="text-[10px]">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <div className="p-3 overflow-x-auto flex text-xs">
        {/* Line numbers */}
        <div className="select-none pr-3 mr-3 border-r border-zinc-800 text-zinc-600 text-right font-mono">
          {lines.map((_, i) => (
            <div key={i} className="leading-relaxed">
              {i + 1}
            </div>
          ))}
        </div>
        {/* Code body */}
        <pre className="font-mono leading-relaxed overflow-x-auto flex-1 whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

function splitCodeBlocks(content: string): Array<
  | { type: "code"; code: string; language?: string }
  | { type: "text"; text: string }
> {
  const parts: Array<
    | { type: "code"; code: string; language?: string }
    | { type: "text"; text: string }
  > = [];

  const codeRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        text: content.slice(lastIndex, match.index),
      });
    }
    parts.push({
      type: "code",
      language: match[1] || undefined,
      code: match[2].trim(),
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push({
      type: "text",
      text: content.slice(lastIndex),
    });
  }

  return parts;
}

function FormattedTextBlock({ text }: { text: string }) {
  const lines = text.split("\n");
  const renderedElements: React.ReactNode[] = [];
  let currentList: { type: "ul" | "ol"; items: string[] } | null = null;

  const flushList = () => {
    if (!currentList) return;
    if (currentList.type === "ul") {
      renderedElements.push(
        <ul key={`list-${renderedElements.length}`} className="list-disc list-inside space-y-1 my-1 pl-1">
          {currentList.items.map((item, i) => (
            <li key={i} className="text-foreground/90 leading-snug">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
    } else {
      renderedElements.push(
        <ol key={`list-${renderedElements.length}`} className="list-decimal list-inside space-y-1 my-1 pl-1">
          {currentList.items.map((item, i) => (
            <li key={i} className="text-foreground/90 leading-snug">
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
    }
    currentList = null;
  };

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trim();

    if (!line) {
      flushList();
      return;
    }

    // Headings
    if (line.startsWith("### ")) {
      flushList();
      renderedElements.push(
        <h4 key={idx} className="font-bold text-sm text-foreground mt-2 mb-1">
          {renderInline(line.slice(4))}
        </h4>
      );
      return;
    }
    if (line.startsWith("## ")) {
      flushList();
      renderedElements.push(
        <h3 key={idx} className="font-bold text-base text-foreground mt-2 mb-1">
          {renderInline(line.slice(3))}
        </h3>
      );
      return;
    }
    if (line.startsWith("# ")) {
      flushList();
      renderedElements.push(
        <h2 key={idx} className="font-bold text-lg text-foreground mt-3 mb-1">
          {renderInline(line.slice(2))}
        </h2>
      );
      return;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      flushList();
      renderedElements.push(
        <blockquote
          key={idx}
          className="border-l-2 border-primary/50 pl-3 italic text-muted-foreground my-1.5"
        >
          {renderInline(line.slice(2))}
        </blockquote>
      );
      return;
    }

    // Bullet list
    if (line.startsWith("- ") || line.startsWith("* ")) {
      const itemContent = line.slice(2);
      if (!currentList || currentList.type !== "ul") {
        flushList();
        currentList = { type: "ul", items: [itemContent] };
      } else {
        currentList.items.push(itemContent);
      }
      return;
    }

    // Numbered list
    const numMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (numMatch) {
      const itemContent = numMatch[2];
      if (!currentList || currentList.type !== "ol") {
        flushList();
        currentList = { type: "ol", items: [itemContent] };
      } else {
        currentList.items.push(itemContent);
      }
      return;
    }

    // Standard paragraph
    flushList();
    renderedElements.push(
      <p key={idx} className="text-foreground/90 my-1 leading-relaxed">
        {renderInline(line)}
      </p>
    );
  });

  flushList();

  return <>{renderedElements}</>;
}

function renderInline(text: string): React.ReactNode {
  const pattern = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    if (!part) return null;

    // Link: [label](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const label = linkMatch[1];
      const href = linkMatch[2];

      const isInternal = href.startsWith("/");
      if (isInternal) {
        return (
          <Link
            key={index}
            href={href}
            className="inline-flex items-center text-primary font-semibold hover:underline underline-offset-2 decoration-primary/50 mx-0.5"
          >
            {label}
          </Link>
        );
      }

      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary font-semibold hover:underline underline-offset-2 decoration-primary/50 mx-0.5"
        >
          {label}
        </a>
      );
    }

    // Bold
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={index} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Inline code
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-xs border border-border"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Italic
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <em key={index} className="italic text-foreground/90">
          {part.slice(1, -1)}
        </em>
      );
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}
