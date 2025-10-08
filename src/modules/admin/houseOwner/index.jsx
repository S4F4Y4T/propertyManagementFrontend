"use client";

import React from "react";

import {OwnerProvider} from "./components/OwnersProvider.jsx";
import OwnerAddAction from "./components/OwnerAddAction.jsx";
import OwnerTable from "./components/OwnerTable.jsx";
import OwnerDialog from "./components/OwnerDialog.jsx";

export default function Index() {
  return (
    <OwnerProvider>
        <div>
            <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                <div>
                    <h2 className='text-2xl font-bold tracking-tight'>House Owner List</h2>
                    <p className='text-muted-foreground'>Manage your house owners here.</p>
                </div>
                <OwnerAddAction />
            </div>
            <OwnerTable />
           <OwnerDialog />
        </div>
    </OwnerProvider>
  );
}
