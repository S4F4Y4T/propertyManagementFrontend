"use client";

import React from "react";

import {Provider} from "./components/Provider.jsx";
import AddAction from "./components/AddAction.jsx";
import Table from "./components/Table.jsx";
import Dialog from "./components/Dialog.jsx";

export default function Index() {
  return (
    <Provider>
        <div>
            <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                <div>
                    <h2 className='text-2xl font-bold tracking-tight'>Tenant List</h2>
                    <p className='text-muted-foreground'>Manage your Tenant here.</p>
                </div>
                <AddAction />
            </div>
            <Table />
           <Dialog />
        </div>
    </Provider>
  );
}
