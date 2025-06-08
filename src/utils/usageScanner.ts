import type { FunctionDefinition } from './functionExtractor';

export interface FunctionUsage {
  function: FunctionDefinition;
  references: {
    filePath: string;
    lines: number[];
  }[];
}

/**
 * Detects usage of each function across all project files,
 * excluding the function's own definition line from being counted.
 */
export function detectFunctionUsages(
  functions: FunctionDefinition[],
  fileContents: Record<string, string>
): FunctionUsage[] {
  const usages: FunctionUsage[] = [];

  for (const fn of functions) {
    const usageEntry: FunctionUsage = {
      function: fn,
      references: [],
    };

    for (const [filePath, content] of Object.entries(fileContents)) {
      const lines = content.split('\n');
      const matchLines: number[] = [];

      lines.forEach((line, idx) => {
        const lineNumber = idx + 1;
        const regex = new RegExp(`\\b${fn.name}\\b`);

        if (regex.test(line)) {
          // Skip the definition line itself
          if (!(filePath === fn.filePath && lineNumber === fn.line)) {
            matchLines.push(lineNumber);
          }
        }
      });

      if (matchLines.length > 0) {
        usageEntry.references.push({
          filePath,
          lines: matchLines,
        });
      }
    }

    usages.push(usageEntry);
  }

  return usages;
}
