import * as React from 'react';

type ContextType = {
  initialData?: any;
};

export const AppContext = React.createContext<ContextType>({});
