import {useContext} from 'react';

import { createContext, useState } from 'react';

export const OwnerContext = createContext(undefined);

export const OwnerProvider = ({ children }) => {

    const [open, setOpen] = useState(null);
    const [refreshData, setRefreshData] = useState(null);
    const [currentRow, setCurrentRow] = useState(null);

    return (
        <OwnerContext.Provider value={{open, setOpen, setCurrentRow, currentRow, refreshData, setRefreshData}}>
            {children}
        </OwnerContext.Provider>
    );
};

export const useOwner = () => {
    const ownerContext = useContext(OwnerContext)

    if (!ownerContext) {
        throw new Error('useOwner has to be used within <UsersContext>')
    }

    return ownerContext
}

