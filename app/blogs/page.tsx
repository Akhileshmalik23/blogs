'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Container from '../components/Container';
import EmptyState from '../components/EmptyState';
import { getStaticBlogs } from '../actions/getStaticProps';

const Page = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [data, setData] = useState([]);
  const category = params?.get('category');

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await getStaticBlogs(category);
      setData(fetchedData);
    };

    getData();
  }, [category]);

  if (!data || data.length === 0) {
    return <EmptyState />;
  }

  return (
    <Container>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {data.map((item) => (
          <div
            key={item.id}
            className="col-span-1 cursor-pointer group"
            onClick={() => router.push(`/blogs/${item.id}`)}
          >
            <div className="flex flex-col gap-1 w-full">
              <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                <Image
                  alt={item.title}
                  src={item.imageSrc}
                  className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-300"
                  fill
                />
              </div>
              <div className="mt-2">
                <h2 className="font-semibold text-lg text-gray-800">{item.title}</h2>
                <p className="mt-1 text-gray-600 line-clamp-2">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Page;
