import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hash } from "bcrypt";
import * as z from "zod";

const userSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = userSchema.parse(body);

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { use: null, error: "User with email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // newUserPassword contains the hashed password of the newly created user,
    // but it is not used further to avoid exposing sensitive information.
    const { password: newUserPassword, ...rest } = newUser;
    console.log("Hashed Password:", newUserPassword);

    return NextResponse.json({
      user: rest,
      message: "User created successfully",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
