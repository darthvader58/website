'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, Copy } from 'lucide-react';

type CodeBlockTarget = {
  id: string;
  pre: HTMLPreElement;
  code: HTMLElement;
};

function copyWithFallback(text: string) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);

  return Promise.resolve();
}

export default function BlogCodeCopyButtons() {
  const [targets, setTargets] = useState<CodeBlockTarget[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const codeBlocks = Array.from(document.querySelectorAll<HTMLPreElement>('.blog-prose pre'))
      .map((pre, index) => {
        const code = pre.querySelector<HTMLElement>('code');

        if (!code) {
          return null;
        }

        return {
          id: `blog-code-block-${index}`,
          pre,
          code,
        };
      })
      .filter((target): target is CodeBlockTarget => Boolean(target));

    setTargets(codeBlocks);
  }, []);

  async function handleCopy(target: CodeBlockTarget) {
    const text = target.code.textContent ?? '';

    await copyWithFallback(text);
    setCopiedId(target.id);
    window.setTimeout(() => {
      setCopiedId((currentId) => (currentId === target.id ? null : currentId));
    }, 1600);
  }

  return (
    <>
      {targets.map((target) => {
        const copied = copiedId === target.id;

        return createPortal(
          <button
            key={target.id}
            type="button"
            className="blog-code-copy"
            aria-label={copied ? 'Code copied' : 'Copy code'}
            title={copied ? 'Copied' : 'Copy code'}
            onClick={() => {
              void handleCopy(target);
            }}
          >
            {copied ? <Check aria-hidden="true" size={16} /> : <Copy aria-hidden="true" size={16} />}
            <span className="sr-only">{copied ? 'Code copied' : 'Copy code'}</span>
          </button>,
          target.pre
        );
      })}
    </>
  );
}
