"use client";
import React, {useEffect, use} from 'react';
import MainViewContainer from "@/app/components/container";
import Map from "@/app/components/Map";
import Header from "@/app/components/Header";
import Image from "next/image";
import PdpCalender from "@/app/components/PdpCalendar";

import {
  PropertyDetailsContextProvider,
  usePdp,
} from "../../context/PropertyDetailsContext";

export default function PropertyListingPage({ params }) {
  return (
    <PropertyDetailsContextProvider >
      <MainViewContainer className="mx-64">
        <div className="text-black">
          <ListingWrapper listingId={params.id}/>
        </div>
      </MainViewContainer>
    </PropertyDetailsContextProvider>
  );
}

const ListingWrapper = ({listingId}) => {
  const { setPropertyId } = usePdp();

  useEffect(() => {
    console.log('loaded')
    setPropertyId(listingId);
  }, [listingId])

  return (
    <div>
      <Header />
      <ListingTitle />
      <ListingGallery />
      <ListingTwoColumn />
      <Map />
    </div>
  );
};
const ListingTitle = () => {
  return (
    <div className="py-4">
      <div className="text-4xl font-medium flex flex-row content-center justify-between">
        <div>
          <h1>Minecraft house amazing view</h1>
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
  return (
    <div className="py-4">
      <div className="flex flex-row gap-4 rounded-4">
        <div className="w-1/2">
          <Image
            src="https://placehold.co/900x900/png?text=HeroImage"
            alt="House"
            width={900}
            height={900}
          />
        </div>
        <div className="w-1/2 grid grid-cols-2 gap-4 ">
          <Image
            src="https://placehold.co/300x300/png?text=Image"
            alt="House"
            width={450}
            height={450}
          />
          <Image
            src="https://placehold.co/300x300/png?text=Image"
            alt="House"
            width={450}
            height={450}
          />
          <Image
            src="https://placehold.co/300x300/png?text=Image"
            alt="House"
            width={450}
            height={450}
          />
          <Image
            src="https://placehold.co/300x300/png?text=Image"
            alt="House"
            width={450}
            height={450}
          />
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
          </div>
        </div>
        <div className="ml-16 w-1/3">
          <PdpCalender />
        </div>
      </div>
    </div>
  );
};

const PropertyInfo = () => {
  return (
    <div className="py-4 border-b-1 border-gray-300">
      <h1 className="text-2xl font-medium">House in the overworld</h1>
      <p className="font-normal">4 guests - 2 bedrooms - 2 beds - 1 bath</p>
      <p className="font-bold"> 4.4/5 - 100 reviews</p>
    </div>
  );
};

const HostProfile = () => {
  return (
    <div className="py-8 border-b-1 border-gray-300">
      <div className="flex gap-4 ">
        <Image
          className="rounded-full"
          src="https://placehold.co/40x40/png?text=Image"
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
  return (
    <p className="font-light text-gray-800 py-8 border-b-1 border-gray-300">
      Escape to this charming lakeside house nestled in a serene plains biome,
      offering breathtaking views of a sparkling lake framed by lily pads and
      distant mountains. Perfect for adventurers seeking a cozy base or a
      peaceful getaway, this custom-built Minecraft home combines rustic charm
      with modern conveniences.
    </p>
  );
};
