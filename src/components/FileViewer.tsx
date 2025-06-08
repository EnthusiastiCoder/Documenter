// FileViewer.tsx
import React, { useEffect, useState } from 'react';
import { getFiles } from '../utils/fileDiscovery';
import { extractFunctions, type FunctionDefinition } from '../utils/functionExtractor';
import { detectFunctionUsages, type FunctionUsage } from '../utils/usageScanner';
import SearchBar from '../components/SearchBar';
import FunctionItem from '../components/FunctionItem';

const ABSOLUTE_PROJECT_PATH = 'C:\\Users\\enthu\\Projects\\Documenter\\Documenter\\project';

const FileViewer: React.FC = () => {
  const [usages, setUsages] = useState<FunctionUsage[]>([]);
  const [fileContents, setFileContents] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const analyze = async () => {
      const fileMap = getFiles();
      const contents: Record<string, string> = {};
      const allFunctions: FunctionDefinition[] = [];

      for (const [path, load] of Object.entries(fileMap)) {
        const content = await load();
        const relPath = path.replace('/project', '');
        contents[relPath] = content;
        const functions = extractFunctions(content, relPath);
        allFunctions.push(...functions);
      }

      const functionUsages = detectFunctionUsages(allFunctions, contents);
      setUsages(functionUsages);
      setFileContents(contents);
    };

    analyze();
  }, []);

  const duplicates = usages.reduce((acc, usage) => {
    acc[usage.function.name] = acc[usage.function.name] || [];
    acc[usage.function.name].push(usage.function.filePath);
    return acc;
  }, {} as Record<string, string[]>);

  const filtered = usages.filter(u =>
    u.function.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toVSCodeLink = (relPath: string, line: number) => {
    const fullPath = `${ABSOLUTE_PROJECT_PATH}${relPath.replace(/^\/project/, '').replace(/\//g, '\\')}`;
    return `vscode://file/${fullPath}:${line}`;
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Function Usage Map</h2>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {filtered.length === 0 ? (
        <p>No functions match your search.</p>
      ) : (
        <ul className="list-disc pl-6">
          {filtered.map((usage, i) => (
            <FunctionItem
              key={i}
              usage={usage}
              duplicates={duplicates}
              toVSCodeLink={toVSCodeLink}
              fileContents={fileContents}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileViewer;
