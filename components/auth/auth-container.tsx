"use client";

import React, { useState } from "react";
import { LoginForm } from "./login-form";
import { SignupForm } from "./signup-form";
import AuthLayout from "./auth-layout";

export default function AuthContainer() {
  const [isLogin, setIsLogin] = useState(true);

  console.log("Current state:", { isLogin });

  return (
    <AuthLayout>
      {isLogin ? (
        <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
      ) : (
        <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </AuthLayout>
  );
}
