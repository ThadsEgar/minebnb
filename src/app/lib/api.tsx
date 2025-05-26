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
        highlight_description: "A setup for crafting, enchanting, and brewing gear.",
        requirements: ["crafting_station_hub", "max_enchanting_setup", "potion_brewing_kit"]
    },
    {
        highlight_name: "The Secure Homesteader",
        highlight_description: "Strong defenses and self-sufficiency for long-term living.",
        requirements: ["perimeter_defense", "automated_food_farm", "comfortable_bedroom"]
    },
    {
        highlight_name: "Nether-Bound & Prepared",
        highlight_description: "Equipped for Nether exploration and resource gathering.",
        requirements: ["secure_nether_portal", "potion_brewing_kit", "organized_chest_storage"]
    },
    {
        highlight_name: "Peak Performance Station",
        highlight_description: "Max out gear and abilities efficiently.",
        requirements: ["max_enchanting_setup", "simple_xp_grinder", "potion_brewing_kit"]
    },
    {
        highlight_name: "Grand Cartographer's Lodge",
        highlight_description: "Ideal for exploration, mapping, and discoveries.",
        requirements: ["local_guidebook", "exploration_map_wall", "scenic_viewpoint"]
    },
    {
        highlight_name: "Tranquil Farming Haven",
        highlight_description: "Focus on sustainable farming and animal husbandry.",
        requirements: ["automated_food_farm", "passive_mob_pen", "fishing_dock_access"]
    },
    {
        highlight_name: "Thriving Trade Hub",
        highlight_description: "Efficient and safe villager trading center.",
        requirements: ["villager_trading_hall", "perimeter_defense", "crafting_station_hub"]
    },
    {
        highlight_name: "Warrior's Proving Grounds",
        highlight_description: "Hone combat skills and farm mob drops.",
        requirements: ["simple_xp_grinder", "archery_target_range", "potion_brewing_kit"]
    },
    {
        highlight_name: "Lakeside Leisure Retreat",
        highlight_description: "Relax with water-themed recreation.",
        requirements: ["fishing_dock_access", "scenic_viewpoint", "jukebox_with_discs"]
    },
    {
        highlight_name: "Well-Rounded Base Camp",
        highlight_description: "A versatile base with key comforts and security.",
        requirements: ["crafting_station_hub", "comfortable_bedroom", "organized_chest_storage"]
    },
    {
        highlight_name: "Explorer's Rest Stop",
        highlight_description: "A cozy base for adventurers to rest and prepare.",
        requirements: ["comfortable_bedroom", "local_guidebook"]
    },
    {
        highlight_name: "Fishing Enthusiast's Paradise",
        highlight_description: "Perfect for fishing and relaxing by the water.",
        requirements: ["fishing_dock_access", "jukebox_with_discs"]
    },
    {
        highlight_name: "Defender's Fortress",
        highlight_description: "A stronghold for maximum security.",
        requirements: ["perimeter_defense", "organized_chest_storage"]
    },
    {
        highlight_name: "Brewer's Nook",
        highlight_description: "Compact setup for potion brewing.",
        requirements: ["potion_brewing_kit", "organized_chest_storage"]
    },
    {
        highlight_name: "Scenic Retreat",
        highlight_description: "A peaceful getaway with great views.",
        requirements: ["scenic_viewpoint", "comfortable_bedroom"]
    }
]


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