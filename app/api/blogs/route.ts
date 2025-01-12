import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {

   const body = await request.json();
   const {
      title,
      description,
      category,
      imageSrc,
   } = body;


   const blog = await prisma.blog.create({
      data: {
         title,
         description,
         category,
         imageSrc,
      },
   });

   return NextResponse.json(blog);
}

export async function GET(request: Request) {
   try {
     const { searchParams } = new URL(request.url);
     const category = searchParams.get("category"); 
 
     const blogs = category
       ? await prisma.blog.findMany({
           where: {
             category: category, 
           },
         })
       : await prisma.blog.findMany();
 
     return NextResponse.json(blogs); 
   } catch (error) {
     return NextResponse.json({ error: "Failed to fetch blogs." }, { status: 500 });
   }
 }
