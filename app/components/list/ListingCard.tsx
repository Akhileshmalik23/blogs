
import React from 'react'

interface ListingCardProps {
    data,
}
const ListingCard: React.FC<ListingCardProps> = ({ data }) => {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="space-y-4">
                {data.length > 0 ? (
                    data.map((item) => (
                        <div
                            key={item.id}
                            className="p-4 bg-white rounded-lg shadow-md border"
                            onClick={() => router.push(`/blogs/${item.id}`)}
                        >
                            <h2 className="text-xl font-semibold text-gray-800">Title</h2>
                            <p className="text-gray-600 mb-2">{item.id}</p>
                            <h3 className="text-lg font-medium text-gray-800">Description</h3>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No listings available.</p>
                )}
            </div>
        </div>
    )
}

export default ListingCard