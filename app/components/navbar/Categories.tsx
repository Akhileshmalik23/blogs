"use client";

import Container from "../Container";
import { FaBook } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { FaTree } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { FaPalette } from "react-icons/fa";
import { FaMusic } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa";
import { FaUtensils } from "react-icons/fa";
import { FaHeartbeat } from "react-icons/fa";
import { FaRunning } from "react-icons/fa";
import { FaTheaterMasks } from "react-icons/fa";
import { FaPlane } from "react-icons/fa";
import { usePathname, useSearchParams } from "next/navigation";
import CategoryBox from "../CategoryBox";

export const categories = [
   {
      label: "Writing",
      icon: FaPen,
      description: "Blogs about writing and creativity.",
   },
   {
      label: "Education",
      icon: FaChalkboardTeacher,
      description: "Educational and instructional content.",
   },
   {
      label: "Ideas",
      icon: FaLightbulb,
      description: "Innovative and thought-provoking ideas.",
   },
   {
      label: "Travel",
      icon: FaPlane,
      description: "Stories and tips about travel adventures.",
   },
   {
      label: "Photography",
      icon: FaCamera,
      description: "Content about photography and visual art.",
   },
   {
      label: "Nature",
      icon: FaTree,
      description: "Exploring the beauty of nature.",
   },
   {
      label: "Technology",
      icon: FaLaptopCode,
      description: "Updates and tutorials on tech trends.",
   },
   {
      label: "Art",
      icon: FaPalette,
      description: "Creative art and design inspirations.",
   },
   {
      label: "Music",
      icon: FaMusic,
      description: "Blogs about music and soundtracks.",
   },
   {
      label: "Food",
      icon: FaUtensils,
      description: "Recipes, reviews, and food photography.",
   },
   {
      label: "Fitness",
      icon: FaRunning,
      description: "Health and fitness tips and routines.",
   },
   {
      label: "Health",
      icon: FaHeartbeat,
      description: "Well-being and healthcare-related blogs.",
   },
   {
      label: "Lifestyle",
      icon: FaBook,
      description: "Posts about personal lifestyle experiences.",
   },
   {
      label: "Entertainment",
      icon: FaTheaterMasks,
      description: "Movies, theater, and entertainment news.",
   },
   {
      label: "Global",
      icon: FaGlobe,
      description: "Insights on global issues and trends.",
   },
];


const Categories = () => {
  
    const params = useSearchParams();
    const category = params?.get("category");
    const pathName = usePathname();
 
    const isMainPage = pathName === "/blogs";
 
    if (!isMainPage) {
       return null;
    }
 

   return (
      <Container>
         <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
            {categories.map((item) => (
               <CategoryBox
                  key={item.label}
                  label={item.label}
                  selected={category === item.label}
                  icon={item.icon}
               />
            ))}

         </div>
      </Container>
   );
};
export default Categories;
