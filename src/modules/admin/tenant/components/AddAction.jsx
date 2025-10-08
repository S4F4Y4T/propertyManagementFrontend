"use client";

import { Button } from "@/components/ui/button";

import {useTenant} from "./Provider.jsx";
import { UserPlus } from 'lucide-react'

export default function AddAction() {

    const { setOpen } = useTenant()

    return (
        <Button className="cursor-pointer" onClick={() => setOpen('add')}>
            Add Tenant <UserPlus />
        </Button>
    );
}
