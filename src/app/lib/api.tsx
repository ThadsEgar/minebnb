import { supabase } from "./supabase"

export const getListings = async () => {
    const { data, error } = await supabase.from('Properties').select(`*, Images!listing_id(*)`)
    if (error) {
        console.log("Error fetching listings:", error)
        throw new Error(error.message)
    }
    const listingsWithImages = data.map((listing) => {
        const images = convertImageUrls(listing.Images)
        return {
            ...listing,
            images: images
        }
    })

    const sourceItem = listingsWithImages[0]
  
    // Create 50 copies in a flat array
    const duplicated = Array(50).fill(null).map((_, index) => ({
        ...sourceItem,
        id: `${sourceItem.id}-copy-${index}`,
        title: `${sourceItem.title} ${index + 1}`,
    }))
    
    return duplicated
}

const convertImageUrls = (images) => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    return images.map((image) => `${supabaseUrl}/storage/v1/object/minebnb-s3/${image.file_path}`)
}