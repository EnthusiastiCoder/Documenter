export function getFiles(): Record<string, () => Promise<string>> {
  const allFiles = import.meta.glob('/project/**/*.{js,ts}', {
    query: '?raw',
    import: 'default',
  }) as Record<string, () => Promise<string>>;

  const ignoreFileMap = import.meta.glob('/.docignore', {
    eager: true,
    query: '?raw',
  }) as Record<string, string>;

  const ignoreContent = Object.values(ignoreFileMap)[0] || '';

  const ignoreList = ignoreContent
    .split('\n')
    .map(line => line.trim().replace(/^\/+|\/+$/g, '')) // remove leading/trailing slashes
    .filter(line => line && !line.startsWith('#'));

  return Object.fromEntries(
    Object.entries(allFiles).filter(([filePath]) => {
      return !ignoreList.some(ignored => {
        const prefix = `/project/${ignored}`;
        return filePath === prefix || filePath.startsWith(prefix + '/');
      });
    })
  );
}
