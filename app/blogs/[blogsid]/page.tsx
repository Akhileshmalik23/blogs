'use client'
import Image from 'next/image';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Container from '@/app/components/Container';

export default function Page() {
  const [data, setData] = useState({});
  const pathname = usePathname();

  useEffect(() => {
    const id = pathname.split('/').pop();
    console.log('Blog ID:', id);

    axios
      .get(`/api/blogs/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [pathname]);

  return (
    <Container>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">{data.title}</h1>
        <div className="relative w-full h-64 md:h-96 mb-6">
          <Image
            alt={data.title}
            src={data.imageSrc}
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-md"
          />
          <div className="absolute bottom-0 right-0 bg-white bg-opacity-75 px-4 py-2 rounded-tl-lg">
            <p className="text-sm font-medium text-gray-700">{data.category}</p>
          </div>
        </div>
        <p className="text-lg text-gray-700 leading-relaxed">{data.description}</p>
      </div>
    </Container>
  );
}
