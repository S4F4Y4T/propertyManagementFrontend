"use client";

import { Button } from "@/components/ui/button";

import {useOwner} from "./OwnersProvider.jsx";
import { UserPlus } from 'lucide-react'

export default function OwnerAddAction() {

    const { setOpen } = useOwner()

    return (
        <Button className="cursor-pointer" onClick={() => setOpen('add')}>
            Add House Owner <UserPlus />
        </Button>
    );
}
