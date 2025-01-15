
export const getStaticBlogs = async (category: string | null) => {
    let url = '/api/blogs';

    if (category) {
        url = `/api/blogs?category=${category}`;
    }

    try {
        const response = await fetch(url,
            {
                next: { revalidate: 3600 }
            });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};
