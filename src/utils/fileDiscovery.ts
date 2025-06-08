export function getFiles(): Record<string, () => Promise<string>> {
  const allFiles = import.meta.glob('/project/**/*.{js,ts}', {
    query: '?raw',
    import: 'default',
  }) as Record<string, () => Promise<string>>;

  const ignoreFileMap = import.meta.glob('/.docignore', {
    eager: true,
    query: '?raw',
  }) as Record<string, any>;

  // Handle the imported content properly
  const ignoreContent = Object.values(ignoreFileMap)[0];
  const ignoreText = typeof ignoreContent === 'string' 
    ? ignoreContent 
    : ignoreContent?.default || '';
  
  const ignoreList = ignoreText
    .split('\n')
    .map((line: string) => line.trim().replace(/^\/+|\/+$/g, '')) // remove leading/trailing slashes
    .filter((line: string) => line && !line.startsWith('#'));

  return Object.fromEntries(
    Object.entries(allFiles).filter(([filePath]) => {
      return !ignoreList.some((ignored: string) => {
        const prefix = `/project/${ignored}`;
        return filePath === prefix || filePath.startsWith(prefix + '/');
      });
    })
  );
}