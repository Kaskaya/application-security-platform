"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGithub, FaGoogle, FaUser, FaUserPlus } from "react-icons/fa";
import { toast } from "sonner";
import Link from "next/link";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!username.trim() || !email.trim() || !password || !confirmPassword) {
      toast.error("All fields are required", {
        description: "Please fill in all the required fields.",
      });
      return;
    }

    if (!email.includes("@")) {
      toast.error("Invalid Email Address", {
        description: "Please include an '@' in your email address.",
      });
      return;
    }

    if (password.length < 6) {
      toast.error("Password too short", {
        description: "Password must be at least 6 characters long.",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords don't match", {
        description: "Please make sure your passwords match.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Registration failed", {
          description: "Please try again with different credentials.",
        });
        return;
      }

      // Registration successful
      toast.success("Registration successful!", {
        description: "Welcome! You are now logged in.",
      });

      // Show loading toast for auto-login
      const loadingToast = toast.loading("Setting up your account...");

      // Automatically sign in the user
      const result = await signIn("credentials", {
        redirect: false,
        username: username.trim(),
        password,
      });

      if (result?.error) {
        toast.dismiss(loadingToast);
        toast.error("Auto-login failed", {
          description: "Please sign in manually.",
        });
        router.push("/signin");
      } else {
        // Wait a bit for session to be established
        setTimeout(() => {
          toast.dismiss(loadingToast);
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md bg-[#1E1F28]/60 backdrop-blur-xs border border-neutral-700/50 shadow-2xl flex flex-col justify-center gap-6 min-h-screen rounded-none p-4 sm:min-h-fit sm:rounded-2xl sm:p-8">
      <div className="flex flex-col items-center mb-2">
        <div className="bg-gradient-to-br from-amber-500 via-orange-600 to-red-700 rounded-full p-3 mb-3 shadow-lg ring-4 ring-black/20">
          <FaUserPlus className="text-white text-3xl" />
        </div>
        <h1 className="text-3xl font-extrabold text-[#E5E7EB] tracking-tight mb-1 text-center drop-shadow">
          Create Account
        </h1>
        <p className="text-[#8A8FA3] text-sm text-center">
          Join our security platform
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4" noValidate>
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
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
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
            autoComplete="new-password"
          />
        </div>
        <div>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            className="w-full px-4 py-2 bg-[#1E1F28] border border-[#2A2B36] text-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#3EAB6E] focus:outline-none transition placeholder-[#8A8FA3]"
            autoComplete="new-password"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-br from-amber-500 via-orange-600 to-red-700 text-white font-bold py-3 rounded-lg shadow-lg transition-all duration-300 text-lg transform hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-0 focus:border-0 active:border-0 focus:outline-none focus:ring-0"
        >
          <FaUserPlus />
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <div className="text-center">
        <p className="text-[#8A8FA3] text-sm">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-amber-500 hover:text-amber-400 font-semibold transition-colors"
          >
            Sign In
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
          <FaGithub className="text-xl" /> Sign up with GitHub
        </button>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-neutral-800 to-neutral-900 hover:bg-neutral-800 text-[#E5E7EB] font-bold py-2.5 rounded-lg shadow-md transition-all duration-300 text-lg border border-neutral-700 focus:ring-2 focus:ring-neutral-500 transform hover:scale-105 cursor-pointer"
        >
          <FaGoogle className="text-xl text-[#EA4335]" /> Sign up with Google
        </button>
      </div>
    </div>
  );
}
