"use client";

import { Button } from "@/components/ui/button";

import {useBill} from "./Provider.jsx";
import { UserPlus } from 'lucide-react'

export default function AddAction() {

    const { setOpen } = useBill()

    return (
        <Button className="cursor-pointer" onClick={() => setOpen('add')}>
            Add Bill <UserPlus />
        </Button>
    );
}
