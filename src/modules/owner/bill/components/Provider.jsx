import {useContext} from 'react';

import { createContext, useState } from 'react';

export const Context = createContext(undefined);

export const Provider = ({ children }) => {

    const [open, setOpen] = useState(null);
    const [refreshData, setRefreshData] = useState(null);
    const [currentRow, setCurrentRow] = useState(null);

    return (
        <Context.Provider value={{open, setOpen, setCurrentRow, currentRow, refreshData, setRefreshData}}>
            {children}
        </Context.Provider>
    );
};

export const useBill = () => {
    const contextVar = useContext(Context)

    if (!contextVar) {
        throw new Error('useBill has to be used within')
    }

    return contextVar
}

