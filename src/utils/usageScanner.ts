import type { FunctionDefinition } from './functionExtractor';

export interface LineInfo {
  line: number;
  content: string;
}
export interface FunctionUsage {
  function: FunctionDefinition;
  references: {
    filePath: string;
    lineInfos: LineInfo[];
  }[];
}

/**
 * Detects usage of each function across all project files,
 * excluding the function's own definition line from being counted.
 */
export function detectFunctionUsages(functions: FunctionDefinition[], fileContents: Record<string, string>): FunctionUsage[] {
  const usages: FunctionUsage[] = [];

  for (const fn of functions) {
    const usageEntry: FunctionUsage = {
      function: fn,
      references: [],
    };

    for (const [filePath, content] of Object.entries(fileContents)) {
      const lines = content.split('\n');
      const matches: LineInfo[] = [];

      lines.forEach((line, idx) => {
        const regex = new RegExp(`\\b${fn.name}\\b`);
        if (regex.test(line) && !(idx + 1 == fn.line && fn.filePath == filePath)) { 
          matches.push({ line: idx + 1, content: line.trim() });
        }
      });

      if (matches.length > 0) {
        usageEntry.references.push({
          filePath:filePath,
          lineInfos:matches
        });
      }
    }

    usages.push(usageEntry);
  }

  return usages;
}

