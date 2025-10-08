import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../data/schema";
import { useAuth } from "@/providers/AuthProvider.jsx";
import useAxios from "@/hooks/useAxios.jsx";
import { useNavigate } from "react-router-dom";
import {AlertCircleIcon} from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert"

export default function LoginForm() {
    const { axiosPublic } = useAxios();
    const { setIsLoggedIn, setUserData, setTokenData } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = async (values) => {
        try {
            const res = await axiosPublic.post("/auth/login", values);
            const { access_token, user } = res.data.data;

            if (res.data.type !== "success") throw new Error("Login failed");

            setTokenData({ accessToken: { token: access_token } });
            setIsLoggedIn(true);
            setUserData(user);

            localStorage.setItem("userData", JSON.stringify(user));
            localStorage.setItem(
                "tokenData",
                JSON.stringify({ accessToken: { token: access_token } })
            );

            navigate("/");
        } catch (err) {
            const errorsArray = err.response?.data?.errors;

            if (Array.isArray(errorsArray)) {
                errorsArray.forEach((errorStr) => {
                    const match = errorStr.match(/^"(.+?)"/);
                    const field = match ? match[1] : "root";
                    const message = errorStr.replace(/^".+?"\s/, "");
                    setError(field, { message });
                });
            } else {
                setError("root", {
                    message: err.response?.data?.message || "Login failed",
                });
            }
        }
    };

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>


                {errors.root?.message && (
                    <Alert variant="destructive">
                        <AlertCircleIcon />
                        <AlertTitle>{errors.root.message}</AlertTitle>
                    </Alert>
                )}

            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="text"
                                placeholder="m@example.com"
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="mb-2 text-xs text-red-600">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className="mb-2 text-xs text-red-600">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <CardFooter className="flex-col gap-2 mt-6 px-0">
                        <Button
                            disabled={isSubmitting}
                            type="submit"
                            className="w-full cursor-pointer"
                        >
                            {isSubmitting ? "Logging in..." : "Login"}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
}
