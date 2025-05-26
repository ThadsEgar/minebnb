"use client";
import Image from "next/image";
import { usePdp } from "@/app/context/PropertyDetailsContext";

export const amenityNameMapping = {
  crafting_station_hub: "Crafting Station Hub",
  max_enchanting_setup: "Maximum Enchanting Setup",
  organized_chest_storage: "Organized Chest Storage",
  secure_nether_portal: "Secure Nether Portal",
  automated_food_farm: "Automated Food Farm",
  potion_brewing_kit: "Potion Brewing Kit",
  comfortable_bedroom: "Comfortable Bedroom",
  simple_xp_grinder: "Simple XP Grinder",
  armor_stand_and_repair: "Armor Stand & Repair",
  scenic_viewpoint: "Scenic Viewpoint",
  perimeter_defense: "Perimeter Defense",
  local_guidebook: "Local Guidebook",
  minecart_transport: "Minecart Transport",
  passive_mob_pen: "Passive Mob Pen",
  fishing_dock_access: "Fishing Dock Access",
  jukebox_with_discs: "Jukebox with Discs",
  exploration_map_wall: "Exploration Map Wall",
  infinite_water_source: "Infinite Water Source",
  villager_trading_hall: "Villager Trading Hall",
  archery_target_range: "Archery Target Range"
};

const AmenityPair = ({ amenityIcon, amenityName }) => {
  return (
    <div className="flex flex-row gap-x-4">
      <Image width={24} height={24} src={`/amenities/${amenityIcon}.png`} alt={amenityName} />
      <p>{amenityName}</p>
    </div>
  );
};

const AmenitySection = () => {
  const { propertyDetailsResponse, loading } = usePdp();
  if (propertyDetailsResponse && propertyDetailsResponse.Amenities) {
    const {Amenities} = propertyDetailsResponse;

    return (
      <div className="py-8">
        <h2 className="text-2xl pb-8">Featured Amenities</h2>
        <div id="amenitiesContainer" className="grid grid-cols-2 gap-y-4">
          {Amenities.map((amenity, index) => {
            const icon = amenity.amenity_name;
            const name = amenityNameMapping[amenity.amenity_name]
            // TODO: change the key to something else than index
            return (
              <AmenityPair key={index} amenityIcon={icon} amenityName={name} />
            );
          })}
        </div>
      </div>
    );
  }
  
  return null; // Return null if conditions aren't met
};

export default AmenitySection;