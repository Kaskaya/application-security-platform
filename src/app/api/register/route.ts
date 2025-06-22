import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const usersFilePath = path.join(process.cwd(), "data", "users.json");

// Helper function to read users data
async function readUsers() {
  try {
    const data = await fs.readFile(usersFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Helper function to write users data
async function writeUsers(users: any[]) {
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
}

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

    // Read existing users
    const users = await readUsers();

    // Check if username already exists
    const existingUser = users.find((user: any) => user.username === username);
    if (existingUser) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 }
      );
    }

    // Check if email already exists
    const existingEmail = users.find((user: any) => user.email === email);
    if (existingEmail) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = {
      id: uuidv4(),
      username,
      password,
      email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add user to the array
    users.push(newUser);

    // Write back to file
    await writeUsers(users);

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
