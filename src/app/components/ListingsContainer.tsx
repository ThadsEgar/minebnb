"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext";

const ListingsContainer = () => {
  const { searchResults, fetchSearchResults, loading, error, totalResults } = useSearch();

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
          <div className="font-light">Lake Views</div>
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
        <div className="flex items-center absolute top-3 right-2 ">
          <Image
            className="object-cover transition-transform duration-300 hover:scale-120"
            src={"/searchCards/heart.png"}
            width={24}
            height={24}
            alt="Heart button"
          />
        </div>
      </div>
    </div>
  );
};

export default ListingsContainer;
