import LatestProductSection from "@/components/latest-product";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { companyName } from "./info";

export default function Home() {
  return (
    <>
      <div className="mx-auto grid max-w-screen-xl px-4 pb-8 lg:grid-cols-12 lg:gap-12 lg:pb-16 xl:gap-0 lg:mt-20">
        {/* Image Section (will appear first on mobile and tablet) */}
        <div className="md:col-span-5 md:mt-0 md:flex order-first lg:order-last">
          <Image
            width={500}
            height={500}
            className="object-cover"
            src="/landing.png"
            alt="shopping illustration"
          />
        </div>

        {/* Content Section */}
        <div className="content-center justify-self-start md:col-span-7 md:text-start mt-2 lg:mt-0">
          <h1 className="mb-4 text-2xl mt-4 font-extrabold leading-none tracking-tight dark:text-white md:max-w-2xl md:text-5xl xl:text-6xl">
            Welcome to {companyName}
            <br />
            Shop the Best Deals on Top Products!
          </h1>
          <p className="mb-6 max-w-2xl text-gray-500 dark:text-gray-400 md:mb-10 md:text-lg  lg:text-xl">
            Discover amazing deals, exclusive offers, and fast delivery on all your favorite products. Shop now and save big!
          </p>
          <Link
            href={`/product`}
            className='px-6 bg-blue-600 hover:bg-blue-700 py-4 rounded-lg font-semibold text-md text-white'
          >

            Shop Now
          </Link>

        </div>
      </div>
      <LatestProductSection/>
    </>
  );
}
