"use client";

import { Button } from "@/components/ui/button";

import {useCat} from "./Provider.jsx";
import { UserPlus } from 'lucide-react'

export default function AddAction() {

    const { setOpen } = useCat()

    return (
        <Button className="cursor-pointer" onClick={() => setOpen('add')}>
            Add Bill Category <UserPlus />
        </Button>
    );
}
