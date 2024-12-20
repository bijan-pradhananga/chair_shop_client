import { useState } from "react";
import API from '@/config/config';

const ProductImages = ({ name, images }) => {
    const [selectedImage, setSelectedImage] = useState(images[0]); // Initialize with the first image

    return (
        <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            {/* Main Image */}
            <div>
                <img
                    className="w-full  aspect-square border border-gray-200 rounded-lg"
                    src={`${API.defaults.baseURL}/${selectedImage}`}
                    alt={name}
                />
            </div>

            {/* Thumbnail Images */}
            <div className="mt-4 flex gap-2 justify-center">
                {images.map((image, index) => (
                    <img
                        key={index}
                        className={`w-16 h-16 object-cover border rounded-md cursor-pointer ${
                            selectedImage === image ? "border-indigo-500 ring-2 ring-indigo-500" : "border-gray-200"
                        }`}
                        src={`${API.defaults.baseURL}/${image}`}
                        alt={`${name} ${index + 1}`}
                        onClick={() => setSelectedImage(image)} // Change main image on click
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductImages;
