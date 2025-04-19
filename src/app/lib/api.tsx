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
    const { data, error } = await supabase.from('Properties').select('*, Images!listing_id(*)').eq('id', propertyId).single();
    if (error) {
        console.error('Error fetching property listing page: ', error)
    }
    const pdpWithImages = {
        ...data,
        image_urls: convertImageUrls(data.Images)
    }
    console.log(pdpWithImages)
    return pdpWithImages
}


const convertImageUrls = (images) => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    return images.map((image) => `${supabaseUrl}/storage/v1/object/minebnb-s3/${image.file_path}`)
}