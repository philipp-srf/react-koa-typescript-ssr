import * as React from 'react';

export const AppContext = React.createContext<{ getInitialData: () => any }>({
  getInitialData: () => undefined
});
