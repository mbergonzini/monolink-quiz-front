import React, { createContext, useEffect, useMemo, useState } from 'react';
import { getConfig } from '../../hooks/getConfig';

export interface ConfigContextType {
  apiUrl: string;
}

export const ConfigContext = createContext<ConfigContextType>({
  apiUrl: ''
});

interface ConfigProviderProps {
  children: React.ReactNode;
}

export const ConfigProvider = ({ children }: ConfigProviderProps) => {
  const [isConfigLoaded, setIsConfigLoaded] = useState<boolean>(false);
  const [config, setConfig] = useState<ConfigContextType>({
    apiUrl: '',
    });

  interface ConfigData {
    API_URL: string;
  }

  useEffect(() => {
    getConfig().then((data: ConfigData) => {
      setConfig({
        apiUrl: data.API_URL
      });
      setIsConfigLoaded(true);
    });
  }, []);

  const context = useMemo(() => config, [config]);

  return (
    <>
      {isConfigLoaded && (
        <ConfigContext.Provider value={context}>
          {children}
        </ConfigContext.Provider>
      )}
    </>
  );
};
