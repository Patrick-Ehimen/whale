"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AtSign, Lock, ArrowRight } from "lucide-react";
import Github from "@/public/assets/ts/github";
import Google from "@/public/assets/ts/google";

const signupSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSwitchToLogin = () => {
    router.push("/login");
  };

  const onSubmit = async (data: SignupFormData) => {
    setMessage(null);
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        setMessage({ type: "error", text: result.error || "Signup failed" });
        return;
      }

      setMessage({ type: "success", text: "Account created successfully!" });
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex m-20 items-center justify-center min-h-[calc(100vh-4rem)] p-8">
        <div className="w-full max-w-6xl bg-[#0b0f14] rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            {/* Left side - Signup Form */}
            <div className="p-8 bg-[#12181f] m-5 rounded-3xl lg:p-12 flex flex-col justify-center">
              <div className="w-full max-w-md mx-auto">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Create Your Account
                  </h1>
                  <p className="text-slate-400">
                    Setting up an account takes less than 1 minute.
                  </p>
                </div>

                {/* Display message */}
                {message && (
                  <div
                    className={`mb-4 p-3 rounded ${
                      message.type === "success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                {/* Form Toggle */}
                <div className="flex mb-8 bg-[#171e26] p-2 rounded-lg w-fit">
                  <Button
                    variant="ghost"
                    onClick={onSwitchToLogin}
                    className="text-slate-400 hover:text-white hover:bg-[#171e26] ml-4"
                  >
                    Login
                  </Button>
                  <Button
                    variant="default"
                    className="bg-[#2eb060] hover:bg-green-600 text-white rounded-lg px-6 ml-4"
                  >
                    SignUp
                  </Button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <div className="relative">
                      <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                      <Input
                        {...register("email")}
                        type="email"
                        placeholder="Email Address"
                        className="bg-[#0f141a] text-white border-[##0f141a] pl-12 h-12 rounded-lg"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                      <Input
                        {...register("password")}
                        type="password"
                        placeholder="Password"
                        className="bg-[#0f141a] text-white border-[##0f141a] pl-12 h-12 rounded-lg"
                      />
                    </div>
                    {errors.password && (
                      <p className="text-red-400 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                      <Input
                        {...register("confirmPassword")}
                        type="password"
                        placeholder="Confirm Password"
                        className="bg-[#0f141a] text-white border-[##0f141a] pl-12 h-12 rounded-lg"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-sm">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#2eb060] hover:bg-green-600 text-white h-12 rounded-lg font-semibold flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? "Creating account..." : "Continue"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>

                {/* Social Login */}
                <div className="mt-8">
                  <p className="text-slate-400 text-center mb-4">
                    Or Continue with
                  </p>
                  <div className="flex justify-center gap-4">
                    <Github />
                    <Google />
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Background Image */}
            <div
              className="hidden lg:block bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('/assets/layout2-image.svg')",
              }}
            >
              <div className="w-full h-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
