// "use client";

// import React, { useState } from "react";
// import LoginForm from "./login/page";
// import SignupForm from "./sign-up/page";
// import AuthLayout from "./auth-layout";

// export default function AuthContainer() {
//   const [isLogin, setIsLogin] = useState(true);

//   console.log("Current state:", { isLogin });

//   return (
//     <AuthLayout>
//       {isLogin ? (
//         <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
//       ) : (
//         <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
//       )}
//     </AuthLayout>
//   );
// }
