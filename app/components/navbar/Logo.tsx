'use client'

import useLoginModal from "@/app/hooks/useLoginModal";
import useBlogModal from "@/app/hooks/useBlogModal";
import Image from "next/image"

import { useRouter } from "next/navigation"
import { useCallback } from "react";


interface UserLogoProps {
   currentUser?: any;
}

const Logo: React.FC<UserLogoProps> = ({ currentUser }) => {
   const router = useRouter();
   const loginModal = useLoginModal()
   const blogModal = useBlogModal()
   const onBlog = useCallback(() => {
      if (!currentUser) {
         return loginModal.onOpen()
      }
      router.push('/blogs')
      blogModal.onOpen()
   }, [currentUser, loginModal, blogModal])
   return (
      <div className="flex flex-row items-center gap-3">

         <Image
            onClick={() => router.push("/")}
            alt="Logo"
            className="hidden md:block cursor-pointer"
            width={100}
            height={100}
            src="/images/logo.png"
         />

         <div
            onClick={onBlog}
            className="hidden md:block text-sm font-extrabold text-red-400 py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
         >
            Create Blogs
         </div>
      </div>
   );
}

export default Logo
