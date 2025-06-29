import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: NextRequest) {
  try {
    const { username, password, email } = await request.json();

    // Validation
    if (!username || !password || !email) {
      return NextResponse.json(
        { error: "Username, password, and email are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Check if username already exists
    const { data: existingUser, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("username", username)
      .single();

    if (userError && userError.code !== "PGRST116") {
      console.error("Database error checking username:", userError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    if (existingUser) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 }
      );
    }

    // Check if email already exists
    const { data: existingEmail, error: emailError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (emailError && emailError.code !== "PGRST116") {
      console.error("Database error checking email:", emailError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    if (existingEmail) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    // Create new user
    const now = new Date().toISOString();
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert([
        {
          username,
          password,
          email,
          created_at: now,
          updated_at: now,
        },
      ])
      .select()
      .single();

    if (insertError) {
      console.error("Database insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }

    // Return user data without password
    const { password: _, ...userWithoutPassword } = newUser;
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
