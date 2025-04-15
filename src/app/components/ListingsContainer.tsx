"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { getListings } from "../lib/api";

const ListingsContainer = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = useMemo(() => {
    return async () => {
      try {
        const data = await getListings();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};

const ListingCard = ({ listing }) => {
  const id = listing.id;
  const price = listing.price;
  const propertyType = listing.property_type;
  const x_coordinate = listing.x_coordinate;
  const y_coordinate = listing.y_coordinate;
  const heroImage = listing.images[0];
  return (
    <Link href={`/listing/${id}`} target="_blank" rel="noopener noreferrer">
      <div className="flex flex-col text-black hover:bg-green-200 duration-300 rounded-2xl">
        <ListingImage heroImageUrl={heroImage} />

        <div className="flex flex-col gap-0 px-1 pt-2 text-sm">
          <div className="font-bold">
            {propertyType} at X: {x_coordinate} Y: {y_coordinate}
          </div>
          <div className="font-light">Lake Views</div>
          <div className="font-medium">{price} Emeralds for 1 night</div>
        </div>
      </div>
    </Link>
  );
};

const ListingImage = ({ heroImageUrl }) => {
  return (
    <div className="relative">
      <div className="pb-2 w-[300px] h-[300px] rounded-2xl overflow-hidden">
        <Image
          src={heroImageUrl}
          alt="Listing"
          width={300}
          height={300}
          className="object-cover scale-275"
          style={{ objectPosition: "center" }}
        />
        <div className="absolute top-3 left-2 text-black bg-neutral-100 rounded-full px-2 py-1">
          Miners Favorite ⛏️
        </div>
        <div className="absolute top-2 right-2 p-1 w-10 h-10 text-2xl">❤️</div>
      </div>
    </div>
  );
};

export default ListingsContainer;
