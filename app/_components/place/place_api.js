const googleKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export const getPlaceIdApi = async (hotelName, latLng) => {
  const baseUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json";
  const params = `?location=${latLng}&query=${encodeURIComponent(
    hotelName
  )}&radius=10&key=${googleKey}`;
  const url = baseUrl + params;

  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  const jsonRes = await res.json();
  const placeId = jsonRes.results[0].place_id;
  return placeId;
};

export const placeDetailsApi = async (placeId) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${googleKey}`;

  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  const jsonRes = await res.json();

  let photoRef = [];
  if (jsonRes.result.photos) {
    photoRef = jsonRes.result.photos.map((photo) => photo.photo_reference);
  }
  return photoRef;
};

export const placePhotosApi = async (photoRef) => {
  const url = `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photoRef}&key=${googleKey}`;

  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "image/*" },
  });

  return res.url;
};

const main = async () => {
  const hotelName = "HOTEL VILLA PANTHEON";
  const latLng = "48.84917,2.34615";

  try {
    const placeId = await getPlaceIdApi(hotelName, latLng);
    const photoRef = await placeDetailsApi(placeId);
    if (photoRef.length > 0) {
      const photoUrl = await placePhotosApi(photoRef[0]);
      console.log("Photo URL:", photoUrl);
    } else {
      console.log("No photo references found.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
