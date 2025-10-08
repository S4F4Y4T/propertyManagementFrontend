import { useState, forwardRef } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const PasswordInput = forwardRef(({ className, disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className={cn("relative rounded-md", className)}>
            <input
                type={showPassword ? "text" : "password"}
                className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
                ref={ref}
                disabled={disabled}
                {...props}
            />
            <Button
                type="button"
                size="icon"
                variant="ghost"
                disabled={disabled}
                className="text-muted-foreground absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-md cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
            >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </Button>
        </div>
    )
})

PasswordInput.displayName = "PasswordInput"

export default PasswordInput
