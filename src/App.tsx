import React from 'react';
import FileViewer from './components/FileViewer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100 text-gray-900">
      <FileViewer />
    </div>
  );
};

export default App;
