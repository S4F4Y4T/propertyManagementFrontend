import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 px-4">
      <h1 className="text-6xl font-extrabold text-red-600 dark:text-red-400 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
        Not Found
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-6 max-w-md">
        The page you are looking for does not exist.
      </p>
      <Button onClick={() => navigate("/")} className="px-6 py-3">
        Go Back Home
      </Button>
    </div>
  );
}