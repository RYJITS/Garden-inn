
import React, { useState, useEffect } from 'react';
import { getLogs, exportLogs } from '../services/chichiLog';

const DebugOverlay: React.FC = () => {
  const [logs, setLogs] = useState(getLogs());
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(getLogs());
    }, 1000); // Poll for changes

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) {
      return (
          <button
              onClick={() => setIsVisible(true)}
              className="fixed bottom-4 right-4 bg-emerald-700 text-white p-2 rounded-full shadow-lg z-[100] text-xs"
          >
              Show Log
          </button>
      )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-stone-800/90 backdrop-blur-sm text-white rounded-lg shadow-2xl z-[100] w-full max-w-md h-80 flex flex-col font-sans">
      <div className="flex justify-between items-center p-2 bg-stone-900 rounded-t-lg">
        <h3 className="font-bold text-sm">Chichi-Log Console</h3>
        <div>
            <button onClick={exportLogs} className="bg-emerald-600 hover:bg-emerald-700 text-xs px-2 py-1 rounded-md mr-2 transition-colors">Export JSON</button>
            <button onClick={() => setIsVisible(false)} className="bg-stone-600 hover:bg-stone-700 text-xs px-2 py-1 rounded-md transition-colors">Hide</button>
        </div>
      </div>
      <div className="flex-grow p-2 overflow-y-auto text-xs font-mono">
        {logs.length > 0 ? logs.slice().reverse().map((log, index) => (
          <div key={index} className="border-b border-stone-700 py-1">
            <span className="text-emerald-400">{log.timestamp.split('T')[1].replace('Z','')}</span>
            <span className="text-yellow-400 mx-2">{log.event}</span>
            <span className="text-stone-400">{JSON.stringify(log.details)}</span>
          </div>
        )) : <p className="text-stone-500 p-4 text-center">No log entries yet.</p>}
      </div>
    </div>
  );
};

export default DebugOverlay;
