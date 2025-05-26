"use client";
import React, { useState, useEffect, use } from "react";
import MainViewContainer from "@/app/components/utils/container";
import Map from "@/app/components/pdp/map/Map";
import Header from "@/app/components/Header";
import Image from "next/image";
import PdpCalender from "@/app/components/pdp/calendar/PdpCalendar";
import ReviewContainer from "@/app/components/pdp/reviews/ReviewSection";
import AmenitySection from "@/app/components/pdp/amenities/AmenitySection";

import {
  PropertyDetailsContextProvider,
  usePdp,
} from "../../context/PropertyDetailsContext";
import { Footer } from "@/app/components/shared/Footer/Footer";

export default function PropertyListingPage({ params }) {
  const unwrappedParams = use(params);

  // TODO TYPE THIS
  return (
    <PropertyDetailsContextProvider>
      <MainViewContainer className="mx-64 sm:mx-4 md:mx-16 lg:mx-32 xl:mx-48 2xl:mx-64">
        <div className="text-black">
          <ListingWrapper listingId={(unwrappedParams as any).id} />
        </div>
      </MainViewContainer>
      <Footer />
    </PropertyDetailsContextProvider>
  );
}

const ListingWrapper = ({ listingId }) => {
  const { setPropertyId } = usePdp();

  useEffect(() => {
    setPropertyId(listingId);
  }, [listingId]);

  return (
    <div>
      <Header />
      <ListingTitle />
      <ListingGallery />
      <div className="relative">
        <ListingTwoColumn />
      </div>
      <ReviewContainer />
      <Map />
    </div>
  );
};
const ListingTitle = () => {
  const { propertyDetailsResponse, loading } = usePdp();

  if (loading || !propertyDetailsResponse) {
    return (
    <div role="status" className="max-w-sm animate-pulse py-8">
      <div className="h-8 w-10/12 bg-gray-100 rounded-full dark:bg-gray-300 mb-4"></div>
      <span className="sr-only">Loading...</span>
  </div>);
  }

  const { title } = propertyDetailsResponse;
  return (
    <div className="py-4">
      <div className="text-4xl font-medium flex flex-row content-center justify-between">
        <div>
          <h1>{title}</h1>
        </div>
        <div className="text-2xl text-gray-500 flex flex-row gap-8">
          <button>Share</button>
          <button>Save</button>
        </div>
      </div>
    </div>
  );
};

const ListingGallery = () => {
  const { propertyDetailsResponse, loading } = usePdp();

  if (loading || !propertyDetailsResponse) {
    return (
      <div className="py-4">
        <div className="flex flex-row gap-4 rounded-4">
          <div className="w-1/2">
            <Image
              className="animate-pulse"
              src="https://placehold.co/900x900/png?text=HeroImage"
              alt="House"
              width={900}
              height={900}
            />
          </div>
          <div className="w-1/2 grid grid-cols-2 gap-4 ">
            <Image
              className="animate-pulse"
              src="https://placehold.co/300x300/png?text=Image"
              alt="House"
              width={450}
              height={450}
            />
            <Image
              className="animate-pulse"
              src="https://placehold.co/300x300/png?text=Image"
              alt="House"
              width={450}
              height={450}
            />
            <Image
              className="animate-pulse"
              src="https://placehold.co/300x300/png?text=Image"
              alt="House"
              width={450}
              height={450}
            />
            <Image
              className="animate-pulse"
              src="https://placehold.co/300x300/png?text=Image"
              alt="House"
              width={450}
              height={450}
            />
          </div>
        </div>
      </div>
    );
  }

  const { image_urls } = propertyDetailsResponse;
  return (
    <div className="py-4">
      <div className="flex flex-row gap-4 rounded-4">
        <div className="w-1/2 relative h-[510px]">
          <Image
            src={image_urls[0]}
            alt="House"
            fill={true}
            className="object-cover"
          />
        </div>
        <div className="w-1/2 grid grid-cols-2 gap-4">
          <div className="relative h-[245px]">
            <Image
              src={image_urls[1]}
              alt="House"
              fill={true}
              className="object-cover"
            />
          </div>
          <div className="relative h-[245px]">
            <Image
              src={image_urls[2]}
              alt="House"
              fill={true}
              className="object-cover"
            />
          </div>
          <div className="relative h-[245px]">
            <Image
              src={image_urls[3]}
              alt="House"
              fill={true}
              className="object-cover"
            />
          </div>
          <div className="relative h-[245px]">
            <Image
              src={image_urls[4]}
              alt="House"
              fill={true}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ListingTwoColumn = () => {
  return (
    <div className="py-4">
      <div className="flex justify-between">
        <div className="w-2/3">
          <div className="flex flex-col">
            <PropertyInfo />
            <HostProfile />
            <PropertyHighlights />
            <PropertyDescription />
            <AmenitySection />
          </div>
        </div>
        <div className="ml-16 w-1/3 justify-items-end">
          <PdpCalender />
        </div>
      </div>
    </div>
  );
};

const PropertyInfo = () => {
  const { propertyDetailsResponse, loading } = usePdp();
  if (loading || !propertyDetailsResponse) {
    return <div>Loading...</div>;
  }
  const { property_type, bedrooms, bathrooms, reviewOverview } = propertyDetailsResponse;
  const {count, average} = reviewOverview
  return (
    <div className="pb-4 border-b-1 border-gray-300">
      <h1 className="text-2xl font-medium">{property_type} in the overworld</h1>
      <p className="font-normal">
        {bedrooms * 2} guests · {bedrooms} bedrooms · {bedrooms * 2} beds ·{" "}
        {bathrooms} bath
      </p>
      <p className="font-bold">{`${average} / 5.00 · ${count} reviews`}</p>
    </div>
  );
};

const HostProfile = () => {
  return (
    <div id="hostprofile-section" className="py-8 border-b-1 border-gray-300">
      <div className="flex gap-4 ">
        <Image
          className="rounded-full"
          src="/host/steve.png"
          alt="HostProfile"
          width={50}
          height={50}
        />
        <div>
          <p>Hosted by Steve</p>
          <p>Superhost - 3 years hosting</p>
        </div>
      </div>
    </div>
  );
};

const PropertyHighlights = () => {
  return (
    <div className="py-8 border-b-1 border-gray-300">
      <PropertyHighlight
        icon="🏠"
        text="Cave"
        subtext="1 hour away from the nearest cave"
      />
      <PropertyHighlight
        icon="🏠"
        text="Self check-in"
        subtext="Check yourself in with the lockbox"
      />
      <PropertyHighlight
        icon="🏠"
        text="Hot Springs"
        subtext="Soak in the hot springs"
      />
    </div>
  );
};

const PropertyHighlight = ({ icon, text, subtext }) => {
  return (
    <div className="flex flex-row gap-12">
      <div className="text-4xl flex justify-center items-center">{icon}</div>
      <div className="flex flex-col justify-center">
        <div className="font-bold text-gray-800">{text}</div>
        <div className="font-light text-gray-500">{subtext}</div>
      </div>
    </div>
  );
};

const PropertyDescription = () => {
  const { propertyDetailsResponse, loading } = usePdp();
  if (loading || !propertyDetailsResponse) {
    return <div>Loading...</div>;
  }
  const { property_description } = propertyDetailsResponse;
  return (
    <p className="font-light text-gray-800 py-8 border-gray-300 border-b-1">
      {property_description}
    </p>
  );
};
