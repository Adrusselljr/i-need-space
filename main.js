// Query Selectors
const address = document.querySelector("#address")
const apiKey = document.querySelector("#api-key")
const norad = document.querySelector("#norad")
const search = document.querySelector("#search")
const culmination = document.querySelector("#culmination")
const rise = document.querySelector("#rise")
const set = document.querySelector("#set")

culmination.innerText = "0000-00-00 00:00:00.000000+00:00"
rise.innerText = "0000-00-00 00:00:00.000000+00:00"
set.innerText = "0000-00-00 00:00:00.000000+00:00"

search.addEventListener('click', () => {

    const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address.value}.json?access_token=${apiKey.value}`

    const geocodingRequest = async () => {

        const httpResponse = await fetch(geocodingUrl)
        const geocodingData = await httpResponse.json()
        return geocodingData

    }
    
    const getgeocodingData = async () => {

        const geocodingData = await geocodingRequest()
        const lat = geocodingData.features[0].geometry.coordinates[1]
        const lon = geocodingData.features[0].geometry.coordinates[0]
        console.log(`lon: ${lon}, lat: ${lat}`)
        
        const satelliteUrl = `https://satellites.fly.dev/passes/${norad.value}?lat=${lat}&lon=${lon}&limit=1&days=15&visible_only=true`
        const httpResponse = await fetch(satelliteUrl)
        const satelliteData = await httpResponse.json()
        return satelliteData

    }

    const getSatelliteData = async () => {

        const satelliteData = await getgeocodingData()
        console.log(satelliteData)
        culmination.innerText = satelliteData[0].culmination.utc_datetime
        rise.innerText = satelliteData[0].rise.utc_datetime
        set.innerText = satelliteData[0].set.utc_datetime
        console.log(`Culmination Date/Time: ${satelliteData[0].culmination.utc_datetime}`)
        console.log(`Rise Date/Time: ${satelliteData[0].rise.utc_datetime}`)
        console.log(`Set Date/Time: ${satelliteData[0].set.utc_datetime}`)

    }
    getSatelliteData()

})