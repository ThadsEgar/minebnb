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
        reviewOverview: reviewsOverview(data.Reviews)
    }

    console.log(convertedPdp)
    
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
    
}