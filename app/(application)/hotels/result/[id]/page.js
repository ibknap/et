"use client";

import Navbar from "@/app/_components/navs/navbar";
import Footer from "@/app/_components/navs/footer";
import BottomNavbar from "@/app/_components/navs/bottom_navbar";
import { useState } from "react";
import {
  Box,
  Building,
  Calendar,
  Calendar2,
  Call,
  Check,
  Global,
  House,
  Location,
  Paperclip,
  People,
  Star1,
  Trash,
} from "iconsax-react";
import Image from "next/image";
import { Modal } from "react-bootstrap";
import Link from "next/link";
import Loader from "@/app/_components/loader";
import { toast } from "react-toastify";
import capitalize from "@/app/_utils/capitalize";
import { toCurrency } from "@/app/_utils/to_currency";
import { toDate } from "@/app/_utils/to_date";

const hotel = {
  id: 3718191,
  name: "TRANSCORP HILTON ABUJA",
  iataCode: "ABV",
  subType: "HOTEL_GDS",
  relevance: 72,
  type: "location",
  hotelIds: ["HLABV230"],
  address: {
    cityName: "ABUJA",
    countryCode: "NG",
  },
  geoCode: {
    latitude: 9.09313,
    longitude: 7.4764,
  },
  photos: [
    "https://lh3.googleusercontent.com/places/ANXAkqGFETd7owpfUQ6Sh2tlWx2A2LutS3eLVM9yWAINtLqxCvTl_OaSwZXFdLkI-2VdDDjJegfNmIL0KMl5jlHTxw00C9_S7LnpJ3U=s1600-w600",
    "https://plus.unsplash.com/premium_photo-1675972399394-9d9033de1d9e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ,
    "https://plus.unsplash.com/premium_photo-1668496902276-5d0ba0728335?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ,
    "https://plus.unsplash.com/premium_photo-1672082422409-879d79636902?q=80&w=3165&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ,
    "https://plus.unsplash.com/premium_photo-1675827055597-2406877d4764?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ,
    "https://plus.unsplash.com/premium_photo-1672055504819-3c87b9865333?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ,
    "https://plus.unsplash.com/premium_photo-1676469292214-2871e2841cbe?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  details: {
    address_components: [
      {
        long_name: "1061",
        short_name: "1061",
        types: ["street_number"],
      },
      {
        long_name: "Herbert Macaulay Way",
        short_name: "Herbert Macaulay Wy",
        types: ["route"],
      },
      {
        long_name: "Central Business Dis",
        short_name: "Central Business Dis",
        types: ["neighborhood", "political"],
      },
      {
        long_name: "Abuja",
        short_name: "Abuja",
        types: ["locality", "political"],
      },
      {
        long_name: "City Centre",
        short_name: "City Centre",
        types: ["administrative_area_level_3", "political"],
      },
      {
        long_name: "Abuja Municipal Area Council",
        short_name: "AMAC",
        types: ["administrative_area_level_2", "political"],
      },
      {
        long_name: "Federal Capital Territory",
        short_name: "Federal Capital Territory",
        types: ["administrative_area_level_1", "political"],
      },
      {
        long_name: "Nigeria",
        short_name: "NG",
        types: ["country", "political"],
      },
      {
        long_name: "900103",
        short_name: "900103",
        types: ["postal_code"],
      },
    ],
    adr_address:
      '<span class="street-address">1061 Herbert Macaulay Wy</span>, <span class="extended-address">Central Business Dis</span>, <span class="locality">Abuja</span> <span class="postal-code">900103</span>, <span class="region">Federal Capital Territory</span>, <span class="country-name">Nigeria</span>',
    business_status: "OPERATIONAL",
    editorial_summary: {
      language: "en",
      overview:
        "Warmly furnished quarters in an informal hotel offering a bar, a guest lounge & breakfast.",
    },
    formatted_address:
      "1061 Herbert Macaulay Wy, Central Business Dis, Abuja 900103, Federal Capital Territory, Nigeria",
    formatted_phone_number: "0812 999 7185",
    geometry: {
      location: {
        lat: 9.0519147,
        lng: 7.486399100000001,
      },
      viewport: {
        northeast: {
          lat: 9.053206830291503,
          lng: 7.487597930291503,
        },
        southwest: {
          lat: 9.050508869708498,
          lng: 7.484899969708498,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    icon_background_color: "#909CE1",
    icon_mask_base_uri:
      "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
    international_phone_number: "+234 812 999 7185",
    name: "L'eola Suites Abuja",
    photos: [
      {
        height: 2000,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/112629024838894410794">L&#39;eola Suites Abuja</a>',
        ],
        photo_reference:
          "AeeoHcKqSUrRyPc7xgpdJK7GSP4AO5t9BTLA6g8uX8JflDdygJ11UnC6_FEyYkhovTD77SxOA_YgLOoCjJ7yhaoLlpTIVwpXBMlxQsTZ5xG1fPQeQYfxJNqtPkaSNXpg3f8EE5N9yIsjzHzy04ZA1THJhOvdSaafIyjO6-2p_sKkbyOYlw_LaTnH9a_p3T_u9lxx96s_JXD0Twg95YrVIqCI0HF4urUg7PpM7oHviu1mUln43_x89plecxidVoxgCMQljZ62eltm7cc2LwJ07QpDOu22ItXmsPU0HbeSp1qxbSqIGG2RdnmJW-5nk_R0HDA7POnVK9i98-g",
        width: 3000,
      },
      {
        height: 2000,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/112629024838894410794">L&#39;eola Suites Abuja</a>',
        ],
        photo_reference:
          "AeeoHcLxz8ZuUb5QvAqkrslhGdYzHvcvDHMHijdRtM9tHSre_aB-dkldsjtFLiBe1VO6vzp7TIfcgl6Ik5ymSyKoR8PXEOKr7XYfgToSBGIR9Bs7-29Cm0tPkION7wJvDaPUj-uBIp3C33XaYxaGNhSxPM6Ck213jKzxSbq_ClBQ0qz4rz8FqMMlQ33TQ2WiW8XcLfDMpuYYWkxkGoz5juoWN_q_ijgykT2QYjLzkNJIEANCTcfLJeVyM8OaQnX_OSofBDD6_FttOD0PQPHtcnjkFVdcYnrkjVTa_DA2YHFaL0uXOKFtvvP8tN4YVvk-zdRY1j1OCeAXRWo",
        width: 3000,
      },
      {
        height: 2604,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/114721497954666539924">Sotonye Allwell-Brown</a>',
        ],
        photo_reference:
          "AeeoHcIebE7B-mpfgYYwl2tHuwXDOBYO0PyXNm23TzNKw3BPlTGmEB-GUhZRpmiWx-2N6wXcODUD1GqtIqprvL7PypiC8bfkfbR8bnXyKtcXFRfu_HIEzoRo1v4WZK-bwyXllcFp5AMbErswjKnfWe3hWEGW6ypWOqdLBKv4olvt4IWZdUq8qExVEAShqmO_Nyfb4ZrqGxsZipWhIqwjM5dyQy2HroHVqpeLfT600HsQ2YNVnM-7BMjjUDEinpqK1S0u4-e1gUC8y1_9GOGcNB5jG8zKR_eCLZ1DG4kY_V0UrrjKPfrt9J3RqwKWoinMstpEaBddnEs4-1nwovDYniVjvAm2BP_k7J8Di7IQ2xS1UcxFjvHuwHNhLhisArqwKDHFknnYK9eIDgGRKtoCi2YvEGp8W2DuQhnD-YUTwgyA_QOPbd5EFo9TPn30TnWzupYLWsHxRZZo-ZbM4zEeBvmrGGUw_vwaVXexfiZHCISbMGpeaCTsAQSk3WpPpJ9l3bNhEsGgc_RUpPIIWTJJHkdhUH8Wz5h9fdXjRGiw2RdwlyuLNfvuwhuIvq1WUPeWMDVNIojuJEeWMuH7lcg5tHqhlqR2x8qmR9r3gysRnq207TbT-Qplld4tjS66YQAiwmcLAbxEsQ",
        width: 4624,
      },
      {
        height: 1333,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/112629024838894410794">L&#39;eola Suites Abuja</a>',
        ],
        photo_reference:
          "AeeoHcJ01UaRWD8MkjFB-wX4hsja7jILMLXKHUE8rAiAaBKSwCvxQpScOe0HsiiyYV0QF4sXCW-pJsGNxjAsMcermKCeLlniloZWnc8-_WMPkbu3advh_K4xpxDM0PlAKviJF3FyZjyNTQEibE9DA6uFpPpmslBuX185RqX6NRd43VcxnCJ8Ra4Z04TkE1FePvpjGDc-x4TvB37k0fOxRp8m52Kb-sHPVGK6sy6qyH6TU1nnCUt33V3TIYub7DLdvQ1FrNpgmG_fitCPkatwiEpXrxsgM1jgoXNOODa6NLDo-4gKJAnrQZXxOLUKEHL80ZUYRphVJXKtSb0",
        width: 2000,
      },
      {
        height: 2002,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/112629024838894410794">L&#39;eola Suites Abuja</a>',
        ],
        photo_reference:
          "AeeoHcJ3EMec-MZHfOqKlyXNyiSUw7FKTZ2ZYpvLxLpijtuv_2JCmcm-I3pjNosY5nLH1BospsRH67xlwgiva-t8xzQwmA7qLtem-SL4g08vFYBl8SR-KQLtg4FFKxA3E2Br67wxTWRI4xrzYO4nxxmKlkOwHR3boTJOcDIVE5zB7xHOUQxyhtPYeTcT0sdX1CbQT0rOYkzRh-4FgGYFAjCVz2knB21Z4KQwANOLTZdLdKLbVGN57N4etcnIuUWyaRxbG-mKHJY7JBc5ecTyH1ICRhsPEsLH0UySEiMJmhRlSsQOHtBD2CawsFj0ud2EOpBIHkENdFKldW8",
        width: 3000,
      },
      {
        height: 2000,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/112629024838894410794">L&#39;eola Suites Abuja</a>',
        ],
        photo_reference:
          "AeeoHcJMTtEDvIOKXji8W3l76Gif-w3ahqiU5h-p8uFCKcujeFLMY3QOwAqORDKTzrn4XfBiiWBA-Bz3yWuSWEfwTWBoDzEovAFG-NcKFwDszNTjFRvr4Qbuiyf1FYVAfa4KNBOwJdg_fMJTBAdVEVCK3Yox7Buw_gw5-J3elEWG-91M3ZjbBD10AIatD7nLHRVn4VxZSPUb-pISMuiSKlyBl81l7FCxgTPTzvNtLd2z7I2qTUUbaBs9mfSXCDgZpMpHHg2mMb8tLPN0BWG-5o0eNSCzr_3oqD-NgVVeR7ATAchdVLDObMhqN4EPyMVEvgPIbYgRqC6PbXc",
        width: 3000,
      },
      {
        height: 2002,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/112629024838894410794">L&#39;eola Suites Abuja</a>',
        ],
        photo_reference:
          "AeeoHcKfo7BAzfSabtZifS6UObQAtg8dxZ852UDN22JWbKHoxXn5YuZQOuGDkX8MPuRMhUrU7e5cuP-jPcXGDSY9aokEAwxBSyXed8e-hcUEtR8YSuChftk5-tF5ogGQx_LKFoaIvs0zUJxcPlMEzYZbp8SuTekfGmum68XZr7xEVXW2DvvBhm9E6AW48MkpvjfeJbhbEb5S_BhastkSRLGQN5UKcuf1--HXHtIK40TkO8fdwmusCEalQ2zbz6hhMWj6xhu0hsDg9CgTjwQMd0LlUu798XwW67WGxAmX8K-nF4eR2bh0xUTfxck_a2ZZgsdFioXjjvZ_uL8",
        width: 3000,
      },
      {
        height: 2000,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/112629024838894410794">L&#39;eola Suites Abuja</a>',
        ],
        photo_reference:
          "AeeoHcKJBzQRhM_9OO15OI2lCcfppXg4UKMIfFBlKLp4NYXWoTC_G5aNnulo3DpPKOCfbQmiWMkepeI7A1q1YnaEa5YMnhY1OeuRVhbYM80k-PcWYjYlopA2gzhyA7_gfUmX8tIWDdfnERGyVvYV7Uc9UOTYyeYi18JfTdFbhSGxS9y7cz_EYojytFN2oksBH9SONx0oMbu7_cuBNVRNXM77mBj6RQkzhzFNy6y247BFszxqzPE8cP1KGuAK8zxUXdSRUPt0rO7xm-vr5waLYscoBR7VaFJBgCB11_4kiXhlEQvFnsWe0pZdBOqIOJkOaYMimViXXut67Pk",
        width: 3000,
      },
      {
        height: 2002,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/112629024838894410794">L&#39;eola Suites Abuja</a>',
        ],
        photo_reference:
          "AeeoHcJrhdUsim1hHMRry3ytP3-6oi1DC40leHy74KTJ0TK-PmreVxqYCsAq2ptsIm3XqqkpZsUjxyX7bTL8AQJ3Ctd9uFhUdOIffFeBQog1J3HroLQAJJASg47g_5_PaSYrEidBLUd3ssHyaceBI9vYV43jQC2ds9gktSHGI609FrMtykusMdjh0XEQHOTRfauVOM0yxurOc3YsdKjiNDGQ7nny3xYmswGKroTEKPC0qT1ZLVAB0E4avk3sw5c4miSv7f-zJ1aw1YBDWcbloX1ya2psF5c_xFnAtAscCxXADyOKcWly8EvVgsQWBnLFK3LL-t6QLf1Pprw",
        width: 3000,
      },
      {
        height: 2002,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/112629024838894410794">L&#39;eola Suites Abuja</a>',
        ],
        photo_reference:
          "AeeoHcJUBRH6v3kAIlG9VyPol1zy7iZJkMV0Ase8Jb7JicwNoefXY8amQSpvFAS7OWxl0q4qM_dNL9kZvQk1OdjbFsXcwmTRMig46exeBkCCMnXWSKlyKUhRthIWAvQnbLpID6lEkZw34Ts54sXjkkvNmdDrZTPYN9pZErtCcSzg0DReTP_IxbJEpkGFrodiLyKb6krAt38NfVotovqiG9UyfbqOiWMqoDsH2T7bgpGeeP__ZginnJUNBseg-Ve56uttr-EBDAX8wJ7yCThatOZE9NUvePzCzhHxAta20UeAtqsIPUGV5FZ66UH15laVk7ulNTc2f9bj3kk",
        width: 3000,
      },
    ],
    place_id: "ChIJR6mNU6ELThAR75EPVHzDdnI",
    plus_code: {
      compound_code: "3F2P+QH Abuja, Nigeria",
      global_code: "6FX93F2P+QH",
    },
    rating: 4.4,
    reference: "ChIJR6mNU6ELThAR75EPVHzDdnI",
    reviews: [
      {
        author_name: "Sen. Ohi",
        author_url:
          "https://www.google.com/maps/contrib/104571161482307731592/reviews",
        language: "en",
        original_language: "en",
        profile_photo_url:
          "https://lh3.googleusercontent.com/a-/ALV-UjVqyF9KNx4Duk66MVtnM6sM7mvQqQ7pJ6aPwUwhDU9NCVTKOC0=s128-c0x00000000-cc-rp-mo-ba2",
        rating: 3,
        relative_time_description: "a month ago",
        text: "Nice cosy and beautiful place for short stay.\nThere is no facility for relaxation or enjoyment.",
        time: 1740823549,
        translated: false,
      },
      {
        author_name: "Phankie Phankie",
        author_url:
          "https://www.google.com/maps/contrib/111584942431186381965/reviews",
        language: "en",
        original_language: "en",
        profile_photo_url:
          "https://lh3.googleusercontent.com/a-/ALV-UjWozw_qfMd4NI2uxwNXhaFTnHv6Q8-ft077Mup0NBQZWDA2qC_Z=s128-c0x00000000-cc-rp-mo",
        rating: 5,
        relative_time_description: "a year ago",
        text: "Absolutely  beautiful and serene space.\n-Staff are very courteous and helpful .\n-Easy to locate in the CBD.\n- enjoyed the peace and quiet of this hotel.\n- Rooms are properly furnished and spacious.\n- We had a kitchenette for basics.\n-food service available on order\n- bathroom and toilet are spacious\n- affordable\nWe would surely recommend and visit here again soon",
        time: 1700508785,
        translated: false,
      },
      {
        author_name: "Gilda Kuo",
        author_url:
          "https://www.google.com/maps/contrib/109634321301908437992/reviews",
        language: "en",
        original_language: "en",
        profile_photo_url:
          "https://lh3.googleusercontent.com/a/ACg8ocJ75DDeNm1kHSD8zsA8LWN4AZUjLzMtQmRdoIh1w5wP-qLb0w=s128-c0x00000000-cc-rp-mo",
        rating: 2,
        relative_time_description: "2 months ago",
        text: "The place is very nice and beautiful I really love it",
        time: 1737468808,
        translated: false,
      },
      {
        author_name: "Olufemi Adewole",
        author_url:
          "https://www.google.com/maps/contrib/108708757382591867631/reviews",
        language: "en",
        original_language: "en",
        profile_photo_url:
          "https://lh3.googleusercontent.com/a-/ALV-UjV_jWNH9eOEgwX74C5H8zcy2yArgRZU5v_eZE97ybrl2W_iYFI=s128-c0x00000000-cc-rp-mo-ba2",
        rating: 4,
        relative_time_description: "a year ago",
        text: "Though I've heard about it for quite a while, I've never had cause to patronise but this visit, to a friend, was an 'eye opener'. Nice ambience, old but solid and well maintained suites. Definitely classy and exclusive. I didn't eat though but what I saw was great.",
        time: 1705559965,
        translated: false,
      },
      {
        author_name: "Joseph KUMWIMBA",
        author_url:
          "https://www.google.com/maps/contrib/116655102616142696854/reviews",
        language: "en",
        original_language: "en",
        profile_photo_url:
          "https://lh3.googleusercontent.com/a-/ALV-UjWzoQiJD1q0QUP0BKOCt3pu5xknOuJNBA62qo_fClSA59I8gS0WlA=s128-c0x00000000-cc-rp-mo-ba7",
        rating: 4,
        relative_time_description: "a year ago",
        text: "It's always excited my expectations when it comes to the group L'oala hotel and suites. This is time around is no different. I was impressed with the service and the room setting. This is a perfect location for those who are on business trip in and around the CBD.\nThe reason I am not giving a 5 star rating is the lack of a restaurant and gym on the premises. This would have help so much and improve the ratings overall.",
        time: 1683353485,
        translated: false,
      },
    ],
    secondary_opening_hours: [
      {
        open_now: true,
        periods: [
          {
            close: {
              date: "2025-04-14",
              day: 1,
              time: "2359",
              truncated: true,
            },
            open: {
              date: "2025-04-08",
              day: 2,
              time: "0000",
              truncated: true,
            },
          },
        ],
        type: "RECEPTION",
        weekday_text: [
          "Monday: Open 24 hours",
          "Tuesday: Open 24 hours",
          "Wednesday: Open 24 hours",
          "Thursday: Open 24 hours",
          "Friday: Open 24 hours",
          "Saturday: Open 24 hours",
          "Sunday: Open 24 hours",
        ],
      },
    ],
    types: [
      "bar",
      "lodging",
      "restaurant",
      "food",
      "point_of_interest",
      "establishment",
    ],
    url: "https://maps.google.com/?cid=8247994706329309679",
    user_ratings_total: 283,
    utc_offset: 60,
    vicinity: "1061 Herbert Macaulay Way, Abuja",
    website: "https://leola.ng/reservation/",
    wheelchair_accessible_entrance: false,
  },
};

export default function HotelDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [hotelOffers, setHotelOffers] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [people, setPeople] = useState("1");

  const onSearchHotelOffers = async (hotelIds) => {
    setIsLoading(true);
    toast.info("Searching for available rooms and offers...");

    try {
      const res = await fetch("/api/get_hotel_offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hotelIds: hotelIds,
          adults: people,
        }),
      });

      const resJson = await res.json();
      const data = resJson.data;

      if (data != undefined || data != null) {
        console.log(data);

        setHotelOffers(data);
      } else {
        toast.error("SORRY; No available rooms at the moment!");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("SORRY; No available rooms at the moment!");
    }
  };

  const onBookOrder = (orderId, type) => {
    console.log(orderId);
    console.log(people);
    console.log(type);
  };

  return (
    <>
      <Navbar />

      <div className="container-fluid mb-5">
        <div className="row justify-content-center">
          <div className="col-12 fw-bold px-0">
            <img
              src={hotel.photos[0]}
              alt="image"
              width="100%"
              height="425px"
              className="object-fit-cover img-responsive mb-4"
            />

            <div className="px-3">
              <h1>{hotel.details.name}</h1>
              <div>
                <Location /> {hotel.details.vicinity}
              </div>
            </div>
          </div>

          <div className="col-md-6 mt-3">
            <div className="col-md-12 mt-3">
              <h4>Description</h4>

              <div className="mt-2 d-flex flex-column">
                <Link
                  href={hotel.details.url}
                  target="_blank"
                  className="fst-italic mt-3"
                >
                  <Location className="me-2" />
                  {hotel.details.formatted_address}
                </Link>

                <hr />

                <Link
                  href={`tel:${hotel.details.international_phone_number.trim()}`}
                  target="_blank"
                >
                  <Call className="me-2" />
                  {hotel.details.international_phone_number}
                </Link>

                <hr />

                <div>
                  <Star1 variant="Bold" className="me-2" color="orange" />
                  <b>
                    {hotel.details.rating}
                    <i className="ms-2">
                      (from {hotel.details.user_ratings_total} people)
                    </i>
                  </b>
                </div>

                <hr />

                {hotel.details.website != undefined && (
                  <>
                    <Link href={hotel.details.website} target="_blank">
                      <Global className="me-2" />
                      {hotel.details.website}
                    </Link>

                    <hr />
                  </>
                )}

                <div className="mb-3">
                  <Building className="me-2" />
                  {hotel.details.business_status}
                </div>

                {hotel.details.editorial_summary != undefined &&
                  hotel.details.editorial_summary.overview}
              </div>
            </div>

            <div className="col-md-12 mt-5">
              <h4>Type</h4>

              {hotel.details.types.length > 0 ? (
                <div className="mt-3 row align-items-center">
                  {hotel.details.types.map((type, index) => (
                    <div key={index} className="col-4 mb-3">
                      <div className="w-100 rounded-pill shadow-sm text-center bg-primary text-white p-2">
                        {type.replaceAll("_", " ")}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Trash size={100} color="black" variant="Bulk" />
              )}
            </div>

            <div
              className={`col-12 mt-5 ${
                hotel.photos.length > 0 ? "" : "text-center"
              }`}
            >
              <h4>Gallery Photos</h4>

              {hotel.photos.length > 0 ? (
                <div className="row mt-3">
                  {hotel.photos.map((img, index) => (
                    <div
                      key={index}
                      onClick={() => setGallery(img)}
                      className="col-sm-4 mb-3 pe-active"
                    >
                      <img
                        src={img}
                        width="100%"
                        height={200}
                        alt="image"
                        className="rounded-4 shadow-sm object-fit-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <Trash size={100} color="black" variant="Bulk" />
              )}
            </div>

            <div className="mt-3">
              <h4>Location</h4>

              <iframe
                src={`https://maps.google.com/maps?q=${hotel.geoCode.latitude},${hotel.geoCode.longitude}&hl=es;&z=14&amp;&output=embed`}
                width="100%"
                height="400"
                className="mt-2 rounded-4"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="col-md-4 mt-5 mt-md-3">
            <div className="mb-4">
              <label className="form-label" htmlFor="people">
                Number of Guest
              </label>
              <select
                id="people"
                required
                className="form-select cus-form-control"
                onChange={(e) => setPeople(e.target.value)}
              >
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5">5 People</option>
              </select>
            </div>

            <button
              disabled={isLoading}
              onClick={() => onSearchHotelOffers(hotel.hotelIds[0])}
              className="btn btn-lg btn-primary w-100 shadow"
            >
              {isLoading ? (
                <Loader />
              ) : (
                <h5 className="m-0 h5">Check Available Rooms & Book</h5>
              )}
            </button>

            <div className="mt-5">
              <h4>Reviews</h4>

              {hotel.details.reviews.length > 0 ? (
                <ul className="mt-3 list-group list-group-flush">
                  {hotel.details.reviews.map((review, index) => (
                    <li key={index} className="list-group-item mb-2">
                      <Link
                        href={review.author_url}
                        target="_blank"
                        className="d-flex align-items-center text-decoration-none"
                      >
                        <Image
                          src={review.profile_photo_url}
                          width={50}
                          height={50}
                          className="me-2"
                          alt="image"
                        />
                        <div className="d-flex flex-column">
                          <b>{review.author_name}</b>
                          <small className="text-muted">
                            {review.relative_time_description}
                          </small>
                        </div>
                      </Link>
                      <p>{review.text}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <Trash size={100} color="black" variant="Bulk" />
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <BottomNavbar />

      {gallery !== null && (
        <Modal
          scrollable
          centered
          show={gallery !== null}
          onHide={() => setGallery(null)}
        >
          <Modal.Body className="p-0 p-3 m-0">
            <div className="container p-0">
              <div className="row">
                <img
                  src={gallery}
                  width="100%"
                  height="100%"
                  alt="image"
                  className="object-fit-cover"
                />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {hotelOffers !== null && (
        <Modal
          scrollable
          dialogClassName="modal-95w"
          backdrop="static"
          show={hotelOffers !== null}
          onHide={() => setHotelOffers(null)}
        >
          <Modal.Header className="py-2" closeButton>
            <Modal.Title className="h5">All Available Offers</Modal.Title>
          </Modal.Header>

          <Modal.Body className="p-0 p-3 m-0">
            <div className="container">
              <div className="row">
                {hotelOffers.length > 0 &&
                  hotelOffers.map((offer, index) => (
                    <div key={index} className="col-md-6">
                      <div className="card mb-3">
                        {offer.offers.length > 0 ? (
                          <ul className="mt-3 list-group list-group-flush">
                            {offer.offers.map((offer_, index_) => (
                              <li key={index_} className="list-group-item mb-2">
                                <div className="row">
                                  <div className="col-12 mb-3">
                                    <small>
                                      {capitalize(offer_.room.description.text)}
                                    </small>
                                  </div>

                                  <div className="col-6 text-center">
                                    <div className="shadow-sm rounded p-3 mb-3">
                                      <div className="d-flex justify-content-center align-items-center">
                                        <Paperclip size={24} className="me-2" />{" "}
                                        <b>Type</b>
                                      </div>
                                      <hr className="my-1" />
                                      {offer_.room.type.replaceAll("_", " ")}
                                    </div>
                                  </div>

                                  <div className="col-6 text-center">
                                    <div className="shadow-sm rounded p-3 mb-3">
                                      <div className="d-flex justify-content-center align-items-center">
                                        <Check size={24} className="me-2" />{" "}
                                        <b>Bed Type</b>
                                      </div>
                                      <hr className="my-1" />
                                      {capitalize(
                                        offer_.room.typeEstimated.bedType
                                      ).replaceAll("_", " ")}
                                    </div>
                                  </div>

                                  <div className="col-6 text-center">
                                    <div className="shadow-sm rounded p-3 mb-3">
                                      <div className="d-flex justify-content-center align-items-center">
                                        <House size={24} className="me-2" />{" "}
                                        <b>Bed(s)</b>
                                      </div>
                                      <hr className="my-1" />
                                      {offer_.room.typeEstimated.beds}
                                    </div>
                                  </div>

                                  <div className="col-6 text-center">
                                    <div className="shadow-sm rounded p-3 mb-3">
                                      <div className="d-flex justify-content-center align-items-center">
                                        <Box size={24} className="me-2" />{" "}
                                        <b>Category</b>
                                      </div>
                                      <hr className="my-1" />
                                      {capitalize(
                                        offer_.room.typeEstimated.category
                                      ).replaceAll("_", " ")}
                                    </div>
                                  </div>

                                  <div className="col-12 text-center">
                                    <div className="shadow-sm rounded p-3 mb-3">
                                      <div className="d-flex justify-content-center align-items-center">
                                        <People size={24} className="me-2" />{" "}
                                        <b>Guests</b>
                                      </div>
                                      <hr className="my-1" />
                                      {offer_.guests.adults}
                                    </div>
                                  </div>

                                  <div className="col-6 text-center">
                                    <div className="shadow-sm rounded p-3 mb-3 border">
                                      <div className="d-flex justify-content-center align-items-center">
                                        <Calendar2 size={24} className="me-2" />{" "}
                                        <b>Check In</b>
                                      </div>
                                      <hr className="my-1" />
                                      {toDate(offer_.checkInDate)}
                                    </div>
                                  </div>

                                  <div className="col-6 text-center">
                                    <div className="shadow-sm rounded p-3 mb-3 border">
                                      <div className="d-flex justify-content-center align-items-center">
                                        <Calendar size={24} className="me-2" />{" "}
                                        <b>Check Out</b>
                                      </div>
                                      <hr className="my-1" />
                                      {toDate(offer_.checkOutDate)}
                                    </div>
                                  </div>
                                </div>

                                <button
                                  onClick={() => {
                                    onBookOrder(offer_.id, offer_.type);
                                  }}
                                  className="btn btn-sm btn-primary shadow w-100 mt-4"
                                >
                                  Book Now{" "}
                                  <small className="text-white">
                                    (
                                    {toCurrency(
                                      offer_.price.total,
                                      offer_.price.currency
                                    )}
                                    )
                                  </small>
                                </button>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No offers available.</p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
