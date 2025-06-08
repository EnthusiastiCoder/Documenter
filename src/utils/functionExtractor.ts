// functionExtractor.ts

export interface FunctionDefinition {
  name: string;
  filePath: string;
  line: number;
}

/**
 * Extract function definitions from file contents using regex.
 */
export function extractFunctions(content: string, filePath: string): FunctionDefinition[] {
  const results: FunctionDefinition[] = [];
  const lines = content.split('\n');

  const functionRegexes = [
    /function\s+([a-zA-Z0-9_$]+)\s*\(/,
    /const\s+([a-zA-Z0-9_$]+)\s*=\s*\(.*?\)\s*=>/,
    /export\s+function\s+([a-zA-Z0-9_$]+)\s*\(/,
  ];

  lines.forEach((line, index) => {
    for (const regex of functionRegexes) {
      const match = line.match(regex);
      if (match && match[1]) {
        results.push({
          name: match[1],
          filePath,
          line: index + 1,
        });
        break;
      }
    }
  });

  return results;
}
