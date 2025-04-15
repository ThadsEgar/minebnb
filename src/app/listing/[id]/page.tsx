import MainViewContainer from "@/app/components/container";
import Map from "@/app/components/Map";
import Header from "@/app/components/Header";
import Image from "next/image";

export default function PropertyListingPage() {
  return (
    <MainViewContainer>
      <div className="text-black">
        <Header />
        <ListingTitle />
        <ListingGallery />
        <ListingTwoColumn />
        <Map />
      </div>
    </MainViewContainer>
  );
}

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
      <div className="flex gap-4">
        <div className="w-2/3">
          <PropertyType />
          <HostProfile />
        </div>
        <div className="w-1/3">
          <Calendar />
        </div>
      </div>
    </div>
  );
};

const PropertyType = () => {
  return (
    <div>
      <h1 className="text-3xl font-medium">House in the overworld</h1>
      <p className="text-2xl font-normal">
        4 guests - 2 bedrooms - 2 beds - 1 bath
      </p>
      <p> 4.4/5 - 100 reviews</p>
    </div>
  );
};

const HostProfile = () => {
  return (
    <div className="py-4">
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

const Calendar = () => {
  return (
    <div>
      <div className="h-[450px] w-[300px] outline-1 shadow-xl rounded-4">
        <div className="text-2xlfont-medium">5 emeralds for 1 night</div>
      </div>
    </div>
  );
};
