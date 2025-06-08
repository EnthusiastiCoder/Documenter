export const extractFunctionBlock = (
  content: string,
  startLine: number
): string => {
  const lines = content.split('\n');
  const fnLines = lines.slice(startLine - 1);
  const result: string[] = [];

  let openBraces = 0;
  let started = false;

  for (const line of fnLines) {
    result.push(line);

    for (const char of line) {
      if (char === '{') {
        openBraces++;
        started = true;
      } else if (char === '}') {
        openBraces--;
      }
    }

    if (started && openBraces === 0) break;
  }

  return result.join('\n').trim();
};
