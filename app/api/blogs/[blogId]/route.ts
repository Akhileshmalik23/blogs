import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";



export async function GET(request: Request) {
    const url = new URL(request.url)
    const id = url.pathname.split("/").pop()

    try {
        if (!id || typeof id !== "string") {
            return NextResponse.json({ error: "Invalid blog ID." }, { status: 400 });
        }

        const blog = await prisma.blog.findUnique({
            where: {
                id
            }
        })
        if (!blog) {
            return NextResponse.json({ error: "Blog not found." }, { status: 404 });
        }
        return NextResponse.json(blog);
    } catch (error) {
        console.error("Error fetching blog:", error);
        return NextResponse.json(
            { error: "An error occurred while fetching the blog." },
            { status: 500 }
        );
    }
}
