"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGithub, FaGoogle, FaUser } from "react-icons/fa";
import Link from "next/link";
import { toast } from "sonner";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Custom validation
    if (!username.trim()) {
      toast.error("Username is required", {
        description: "Please enter your username.",
      });
      return;
    }

    if (!password) {
      toast.error("Password is required", {
        description: "Please enter your password.",
      });
      return;
    }

    // Show loading toast
    const loadingToast = toast.loading("Signing you in...");

    const result = await signIn("credentials", {
      redirect: false,
      username: username.trim(),
      password,
    });
    if (result?.error) {
      toast.dismiss(loadingToast);
      setError("Invalid username or password");
    } else {
      // Wait a bit for session to be established
      setTimeout(() => {
        toast.dismiss(loadingToast);
        window.location.href = "/";
      }, 500);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md bg-[#1E1F28]/60 backdrop-blur-xs border border-neutral-700/50 shadow-2xl flex flex-col justify-center gap-6 min-h-screen rounded-none p-4 sm:min-h-fit sm:rounded-2xl sm:p-8">
      <div className="flex flex-col items-center mb-2">
        <div className="bg-gradient-to-br from-amber-500 via-orange-600 to-red-700 rounded-full p-3 mb-3 shadow-lg ring-4 ring-black/20">
          <FaUser className="text-white text-3xl" />
        </div>
        <h1 className="text-3xl font-extrabold text-[#E5E7EB] tracking-tight mb-1 text-center drop-shadow">
          Welcome Back
        </h1>
        <p className="text-[#8A8FA3] text-sm text-center">
          Sign in to your account
        </p>
      </div>
      {error && (
        <p className="text-red-400 text-center mb-2 font-medium">{error}</p>
      )}
      <form onSubmit={handleCredentialsSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full px-4 py-2 bg-[#1E1F28] border border-[#2A2B36] text-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#3EAB6E] focus:outline-none transition placeholder-[#8A8FA3]"
            autoComplete="off"
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 bg-[#1E1F28] border border-[#2A2B36] text-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#3EAB6E] focus:outline-none transition placeholder-[#8A8FA3]"
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-br from-amber-500 via-orange-600 to-red-700 text-white font-bold py-3 rounded-lg shadow-lg transition-all duration-300 text-lg transform hover:scale-105 cursor-pointer border-0 focus:border-0 active:border-0 focus:outline-none focus:ring-0"
        >
          <FaUser /> Sign In with Credentials
        </button>
      </form>
      <div className="text-center">
        <p className="text-[#8A8FA3] text-sm">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-amber-500 hover:text-amber-400 font-semibold transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </div>
      <div className="flex items-center my-2">
        <div className="flex-grow border-t border-[#2A2B36]"></div>
        <span className="mx-3 text-[#8A8FA3] font-semibold">OR</span>
        <div className="flex-grow border-t border-[#2A2B36]"></div>
      </div>
      <div className="flex flex-col gap-3 mb-6">
        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-neutral-800 to-neutral-900 hover:bg-neutral-800 text-[#E5E7EB] font-bold py-2.5 rounded-lg shadow-md transition-all duration-300 text-lg border border-neutral-700 focus:ring-2 focus:ring-neutral-500 transform hover:scale-105 cursor-pointer"
        >
          <FaGithub className="text-xl" /> Sign in with GitHub
        </button>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-neutral-800 to-neutral-900 hover:bg-neutral-800 text-[#E5E7EB] font-bold py-2.5 rounded-lg shadow-md transition-all duration-300 text-lg border border-neutral-700 focus:ring-2 focus:ring-neutral-500 transform hover:scale-105 cursor-pointer"
        >
          <FaGoogle className="text-xl text-[#EA4335]" /> Sign in with Google
        </button>
      </div>
    </div>
  );
}
