"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext";

const ListingsContainer = () => {
  const { searchResults, fetchSearchResults, loading, error, totalResults } =
    useSearch();

  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < totalResults) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, totalResults]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  if (loading) {
    return (
      <div className="flex flex-wrap gap-6 justify-center">
        {Array.from({ length: 25 }).map((_, index) => (
          <LoadingListingCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error: {"Sorry an error occurred while fetching listings"}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {(searchResults as any[]).map((listing, index) => (
        <div key={listing.id} className="min-w-[270px] min-h-[285px]">
          {index < visibleCount ? (
            <ListingCard listing={listing} />
          ) : (
            <LoadingListingCard key={index} />
          )}
        </div>
      ))}
    </div>
  );
};

const ListingCard = ({ listing }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);
  const id = listing.id;
  const price = listing.price;
  const propertyType = listing.property_type;
  const x_coordinate = listing.x_coordinate;
  const z_coordinate = listing.z_coordinate;
  const srpHighlight = listing.highlight;
  const heroImage =
    listing.images.length > 0
      ? listing.images[0]
      : "https://placehold.co/300x300/png?text=HeroImage";
  return (
    <Link href={`/listing/${id}`} target="_blank" rel="noopener noreferrer">
      <div
        className={`flex flex-col text-black hover:bg-green-200 rounded-2xl transition-all duration-300 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <ListingImage heroImageUrl={heroImage} />
        <div className="flex flex-col gap-0 px-1 pt-2 text-sm">
          <div className="font-bold">
            {propertyType} at X: {x_coordinate} Z: {z_coordinate}
          </div>
          <div className="font-light">{srpHighlight}</div>
          <div className="font-medium">{price} Emeralds for 1 night</div>
        </div>
      </div>
    </Link>
  );
};

const LoadingListingCard = () => {
  return (
    <div className="min-w-[300px] min-h-[300px]">
      <div className="w-full h-full bg-neutral-200 animate-pulse rounded-2xl"></div>
    </div>
  );
};

const ListingImage = ({ heroImageUrl }) => {
  return (
    <div className="relative">
      <div className="pb-2 w-[270px] h-[285px] rounded-2xl overflow-hidden">
        <Image
          src={heroImageUrl}
          alt="Listing"
          width={300}
          height={300}
          className="object-cover scale-175 overflow-hidden"
          style={{ objectPosition: "center" }}
        />
        <div className="absolute top-3 left-2 text-black bg-neutral-100 rounded-full px-2 py-1">
          Miners favorite
        </div>
        <div className="flex items-center absolute top-2.5 right-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            className="transition-transform duration-300 hover:scale-115"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="#bbbbbb"
              stroke="white"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ListingsContainer;
