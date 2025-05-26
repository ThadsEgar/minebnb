import { supabase } from "./supabase"

export const getListings = async () => {
    const { data, error } = await supabase.from('Properties').select(`*, Images!listing_id(*)`)
    if (error) {
        console.error("Error fetching listings:", error)
        throw new Error(error.message)
    }
    const listingsWithImages = data.map((listing) => {
        const images = convertImageUrls(listing.Images)
        return {
            ...listing,
            images: images
        }
    })  
    return listingsWithImages
}

export const getPropertyDetailsPage = async (propertyId) => {
    const { data, error } = await supabase.from('Properties').select(
        `*, 
        Images!listing_id(*),
        Reviews!listing_id(*),
        Amenities!listing_id(*)
        `
    ).eq('id', propertyId).single();
    if (error) {
        console.error('Error fetching property listing page: ', error)
    }
    const convertedPdp = {
        ...data,
        image_urls: convertImageUrls(data.Images),
        reviewOverview: reviewsOverview(data.Reviews),
        highlights: calculatePropertyHighlights(data.Amenities)
    }
    
    return convertedPdp
}

const reviewsOverview = (reviews) => {
    const reviewCount = reviews.length
    const reviewAverage = reviews.reduce((acc, curr) => acc += curr.rating, 0) / reviewCount
    return {
        count: reviewCount,
        average: reviewAverage.toFixed(2)
    }
}
const convertImageUrls = (images) => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    return images.map((image) => `${supabaseUrl}/storage/v1/object/minebnb-s3/${image.file_path}`)
}

const calculatePropertyHighlights = (amenities) => {
    const amenityNames = amenities.map(amenity => amenity.amenity_name);
    const filteredHighlights = HIGHLIGHTS.filter((highlightObject) => {
        const requirements = highlightObject.requirements
        return requirements.every(req => amenityNames.includes(req))
    });
    const top3Highlights = filteredHighlights.slice(0, 3);
    return top3Highlights
}

const HIGHLIGHTS = [
    {
        highlight_name: "Master Artisan's Workshop",
        highlight_description: "Features crafting stations and organized storage for artisans.",
        requirements: ["crafting_station_hub", "max_enchanting_setup", "organized_chest_storage"]
    },
    {
        highlight_name: "The Secure Homesteader",
        highlight_description: "Equipped with perimeter defenses and a secure Nether portal.",
        requirements: ["perimeter_defense", "automated_food_farm", "secure_nether_portal"]
    },
    {
        highlight_name: "Nether-Bound & Prepared",
        highlight_description: "Includes a secure Nether portal and organized storage.",
        requirements: ["secure_nether_portal", "organized_chest_storage"]
    },
    {
        highlight_name: "Peak Performance Station",
        highlight_description: "XP grinding facilities and crafting stations.",
        requirements: ["max_enchanting_setup", "simple_xp_grinder", "crafting_station_hub"]
    },
    {
        highlight_name: "Grand Cartographer's Lodge",
        highlight_description: "Perfect for map exploration and a guidebook for adventurers.",
        requirements: ["exploration_map_wall", "scenic_viewpoint", "local_guidebook"]
    },
    {
        highlight_name: "Tranquil Farming Haven",
        highlight_description: "Supports automated farming, animal care, and scenic views.",
        requirements: ["automated_food_farm", "passive_mob_pen", "scenic_viewpoint"]
    },
    {
        highlight_name: "Thriving Trade Hub",
        highlight_description: "Optimized for villager trading, crafting, and organized storage.",
        requirements: ["villager_trading_hall", "crafting_station_hub", "organized_chest_storage"]
    },
    {
        highlight_name: "Warrior's Proving Grounds",
        highlight_description: "Designed for combat training, XP farming, and archery practice.",
        requirements: ["simple_xp_grinder", "archery_target_range", "max_enchanting_setup"]
    },
    {
        highlight_name: "Lakeside Leisure Retreat",
        highlight_description: "Relax by the fishing dock with scenic views and jukebox entertainment.",
        requirements: ["fishing_dock_access", "scenic_viewpoint"]
    },
    {
        highlight_name: "Well-Rounded Base Camp",
        highlight_description: "A versatile base with crafting, comfortable bedrooms, and enchanting setups.",
        requirements: ["crafting_station_hub", "comfortable_bedroom", "max_enchanting_setup"]
    },
    {
        highlight_name: "Explorer's Rest Stop",
        highlight_description: "A cozy base with a guidebook and comfortable bedrooms for adventurers.",
        requirements: ["comfortable_bedroom", "local_guidebook"]
    },
    {
        highlight_name: "Fishing Enthusiast's Paradise",
        highlight_description: "Ideal for fishing with jukebox entertainment and scenic views.",
        requirements: ["fishing_dock_access", "jukebox_with_discs", "scenic_viewpoint"]
    },
    {
        highlight_name: "Defender's Fortress",
        highlight_description: "A secure stronghold with perimeter defenses and organized storage.",
        requirements: ["perimeter_defense", "organized_chest_storage", "crafting_station_hub"]
    },
    {
        highlight_name: "Brewer's Nook",
        highlight_description: "Compact setup for potion brewing, organized storage, and enchanting setups.",
        requirements: ["potion_brewing_kit", "organized_chest_storage", "max_enchanting_setup"]
    },
    {
        highlight_name: "Scenic Retreat",
        highlight_description: "A peaceful getaway with scenic views, comfortable bedrooms, and a fishing dock.",
        requirements: ["scenic_viewpoint", "comfortable_bedroom", "fishing_dock_access"]
    },
    {
        highlight_name: "Adventurer's Lookout",
        highlight_description: "A scenic viewpoint with a guidebook for explorers.",
        requirements: ["scenic_viewpoint", "local_guidebook"]
    },
    {
        highlight_name: "Potion Master's Corner",
        highlight_description: "A compact setup for potion brewing and enchanting.",
        requirements: ["potion_brewing_kit", "max_enchanting_setup"]
    },
    {
        highlight_name: "Fisherman's Refuge",
        highlight_description: "A cozy fishing dock with jukebox entertainment.",
        requirements: ["fishing_dock_access", "jukebox_with_discs"]
    },
    {
        highlight_name: "Defender's Outpost",
        highlight_description: "A secure base with perimeter defenses and a Nether portal.",
        requirements: ["perimeter_defense", "secure_nether_portal"]
    },
    {
        highlight_name: "Crafting Enthusiast's Nook",
        highlight_description: "A small setup for crafting and organized storage.",
        requirements: ["crafting_station_hub", "organized_chest_storage"]
    },
    {
        highlight_name: "Explorer's Haven",
        highlight_description: "A comfortable bedroom with a local guidebook for adventurers.",
        requirements: ["comfortable_bedroom", "local_guidebook"]
    },
    {
        highlight_name: "Scenic Fishing Spot",
        highlight_description: "A peaceful fishing dock with scenic views.",
        requirements: ["fishing_dock_access", "scenic_viewpoint"]
    }
];


const ALL_AMENITIES = [
    "crafting_station_hub",
    "max_enchanting_setup",
    "organized_chest_storage",
    "secure_nether_portal",
    "automated_food_farm",
    "potion_brewing_kit",
    "comfortable_bedroom",
    "simple_xp_grinder",
    "armor_stand_and_repair",
    "scenic_viewpoint",
    "perimeter_defense",
    "local_guidebook",
    "minecart_transport",
    "passive_mob_pen",
    "fishing_dock_access",
    "jukebox_with_discs",
    "exploration_map_wall",
    "infinite_water_source",
    "villager_trading_hall",
    "archery_target_range"
];