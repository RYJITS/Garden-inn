
const LOG_KEY = 'chichi-log';
const MAX_LOG_ENTRIES = 200;

interface LogEntry {
  timestamp: string;
  event: string;
  details: Record<string, any>;
}

export const logEvent = (event: string, details: Record<string, any> = {}) => {
  try {
    const logsString = localStorage.getItem(LOG_KEY);
    let logs: LogEntry[] = logsString ? JSON.parse(logsString) : [];

    logs.push({
      timestamp: new Date().toISOString(),
      event,
      details,
    });

    if (logs.length > MAX_LOG_ENTRIES) {
      logs = logs.slice(logs.length - MAX_LOG_ENTRIES);
    }

    localStorage.setItem(LOG_KEY, JSON.stringify(logs));
  } catch (error) {
    console.error('Failed to write to chichi-log:', error);
  }
};

export const getLogs = (): LogEntry[] => {
  try {
    const logsString = localStorage.getItem(LOG_KEY);
    return logsString ? JSON.parse(logsString) : [];
  } catch (error) {
    console.error('Failed to read from chichi-log:', error);
    return [];
  }
};

export const exportLogs = () => {
  const logs = getLogs();
  const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'chichi-log.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
