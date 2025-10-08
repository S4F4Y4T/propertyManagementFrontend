import LoginForm from "./components/LoginForm";
import { ModeToggle } from "@/components/mode-toggle.jsx";

export default function Auth() {
    return (
        <>
            <div className="absolute top-4 right-4">
                <ModeToggle />
            </div>
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
                <LoginForm />
            </div>
        </>
    );
}
