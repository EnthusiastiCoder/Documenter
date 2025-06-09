// FunctionItem.tsx
import React from 'react';
import type { FunctionUsage } from '../utils/usageScanner';
import { extractFunctionBlock } from '../utils/functionBlockExtractor';

interface FunctionItemProps {
  usage: FunctionUsage;
  duplicates: Record<string, string[]>;
  toVSCodeLink: (path: string, line: number) => string;
  fileContents: Record<string, string>;
}

const FunctionItem: React.FC<FunctionItemProps> = ({
  usage,
  duplicates,
  toVSCodeLink,
  fileContents
}) => {
  const { name, filePath, line } = usage.function;
  const dupes = duplicates[name] || [];
  const fullFunctionCode = extractFunctionBlock(fileContents[filePath] || '', line);

  return (
    <li className="mb-[1.5rem]">
      <strong>{name}</strong> —{' '}
      <a href={toVSCodeLink(filePath, line)} className="text-blue-600 underline">
        {filePath} (line {line})
      </a>

      {fullFunctionCode && (
        <pre className="bg-gray-900 text-white text-sm p-2 rounded mt-2 overflow-x-auto">
          {fullFunctionCode}
        </pre>
      )}

      {dupes.length > 1 && (
        <p className="text-yellow-600 text-sm mt-2">
          ⚠️ Not to be confused with same-named function in:
          <ul className="list-disc list-inside">
            {dupes
              .filter((p) => p !== filePath)
              .map((d, idx) => (
                <li key={idx}>{d}</li>
              ))}
          </ul>
        </p>
      )}

      {usage.references.length > 0 ? (
        <ul className="list-inside list-disc mt-3">
          {usage.references.map((ref, refIndex) => (
            <li key={refIndex} className="mb-2">
              Used in{' '}
              <a
                href={toVSCodeLink(ref.filePath, ref.lineInfos[0].line)}
                className="text-blue-600 underline"
              >
                {ref.filePath}
              </a>
              <ul className="ml-6 mt-1 list-disc text-sm">
                {ref.lineInfos.map((lineInfo, lineIdx) => (
                  <li key={lineIdx}>
                    <a
                      href={toVSCodeLink(ref.filePath, lineInfo.line)}
                      className="text-blue-500 underline mr-2"
                    >
                      Line {lineInfo.line}
                    </a>
                    <code className="bg-gray-100 px-2 py-1 rounded">
                      {lineInfo.content}
                    </code>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 mt-2">Not used elsewhere.</p>
      )}
    </li>
  );
};

export default FunctionItem;
