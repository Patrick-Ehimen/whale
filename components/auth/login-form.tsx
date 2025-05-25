"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AtSign, Lock, Gift, ArrowRight } from "lucide-react";
import Github from "@/public/assets/ts/github";
import Google from "@/public/assets/ts/google";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  referralCode: z.string().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

export function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Login data:", data);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
        <p className="text-slate-400">Please Enter your email and password</p>
      </div>

      {/* Form Toggle */}
      <div className="flex mb-8 bg-[#171e26] p-2 rounded-lg w-fit">
        <Button
          variant="default"
          className="bg-[#2eb060] hover:bg-green-600 text-white rounded-lg px-6"
        >
          Login
        </Button>
        <Button
          variant="ghost"
          onClick={onSwitchToSignup}
          className="text-slate-400 hover:text-white hover:bg-[#171e26] ml-4"
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
            <p className="text-red-400 text-sm">{errors.email.message}</p>
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
            <p className="text-red-400 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Referral Code Field */}
        <div className="space-y-2">
          <div className="relative">
            <Gift className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              {...register("referralCode")}
              type="text"
              placeholder="Referral code (Optional)"
              className="bg-[#0f141a] text-white border-[##0f141a] pl-12 h-12 rounded-lg"
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#2eb060] hover:bg-green-600 text-white h-12 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          {isSubmitting ? "Signing in..." : "Continue"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      {/* Social Login */}
      <div className="mt-8">
        <p className="text-slate-400 text-center mb-4">Or Continue with</p>
        <div className="flex justify-center gap-4">
          <Github />
          <Google />
        </div>
      </div>
    </div>
  );
}
