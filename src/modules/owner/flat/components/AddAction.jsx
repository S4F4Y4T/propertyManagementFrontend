"use client";

import { Button } from "@/components/ui/button";

import {useFlat} from "./Provider.jsx";
import { UserPlus } from 'lucide-react'

export default function AddAction() {

    const { setOpen } = useFlat()

    return (
        <Button className="cursor-pointer" onClick={() => setOpen('add')}>
            Add Flat <UserPlus />
        </Button>
    );
}
