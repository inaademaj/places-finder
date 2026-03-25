const PLACE_DETAILS = {
  p1: {
    region: 'Ontario, Canada',
    vibe: 'Nature reset',
    stay: '2-3 day escape',
    blurb: 'Misty trails, evergreen air, and a quiet reset far from city noise.',
  },
  p2: {
    region: 'Sahara, North Africa',
    vibe: 'Desert adventure',
    stay: '4-5 day circuit',
    blurb: 'Golden dunes and wide-open skies for travelers craving cinematic landscapes.',
  },
  p3: {
    region: 'Nepal Himalayas',
    vibe: 'Epic mountain trip',
    stay: '7+ day expedition',
    blurb: 'Snow-capped summits and high-altitude drama for bold bucket-list planning.',
  },
  p4: {
    region: 'Puerto Rico, Caribbean',
    vibe: 'Beach recharge',
    stay: '4 day getaway',
    blurb: 'Warm water, soft sand, and an easy rhythm built for recovery days.',
  },
  p5: {
    region: 'Athens, Greece',
    vibe: 'History and culture',
    stay: '3 day city break',
    blurb: 'Ancient landmarks and sun-washed streets packed with stories and texture.',
  },
  p6: {
    region: 'Amazon Basin, Brazil',
    vibe: 'Wild exploration',
    stay: '5 day nature trip',
    blurb: 'Dense canopy, river sounds, and unforgettable biodiversity in every direction.',
  },
  p7: {
    region: 'Iceland',
    vibe: 'Aurora chase',
    stay: '5 day winter trip',
    blurb: 'A night-sky spectacle paired with volcanic terrain and crisp Nordic air.',
  },
  p8: {
    region: 'Kyoto, Japan',
    vibe: 'Mindful escape',
    stay: '4 day cultural stay',
    blurb: 'Temple grounds, seasonal color, and a calmer pace for reflective travel.',
  },
  p9: {
    region: 'Queensland, Australia',
    vibe: 'Ocean discovery',
    stay: '6 day reef trip',
    blurb: 'Color-rich coral systems and clear water for a once-in-a-lifetime dive route.',
  },
  p10: {
    region: 'Paris, France',
    vibe: 'Romantic city break',
    stay: '3 day itinerary',
    blurb: 'Cafe corners, elegant architecture, and a classic wander-anywhere atmosphere.',
  },
  p11: {
    region: 'Arizona, USA',
    vibe: 'Scenic road trip',
    stay: '3-4 day adventure',
    blurb: 'Layered canyon views and huge desert horizons built for sunrise stops.',
  },
  p12: {
    region: 'Venice, Italy',
    vibe: 'Slow travel',
    stay: '2 day escape',
    blurb: 'Canal-side evenings, historic facades, and a city that feels like a film set.',
  },
  p13: {
    region: 'Agra, India',
    vibe: 'Iconic landmark',
    stay: '2-3 day visit',
    blurb: 'A timeless architectural wonder that rewards an early sunrise arrival.',
  },
  p14: {
    region: 'Kerala, India',
    vibe: 'Waterfront calm',
    stay: '4 day unwind',
    blurb: 'Houseboat routes and palm-lined waterways for a deeply relaxing itinerary.',
  },
  p15: {
    region: 'Serengeti, Tanzania',
    vibe: 'Safari experience',
    stay: '5 day safari',
    blurb: 'Open grasslands and unforgettable wildlife encounters across sweeping plains.',
  },
  p16: {
    region: 'Zambia and Zimbabwe',
    vibe: 'Wonder of nature',
    stay: '3 day experience',
    blurb: 'Thunderous waterfalls and dramatic viewpoints that feel powerful in person.',
  },
  p17: {
    region: 'Cusco Region, Peru',
    vibe: 'Ancient trail',
    stay: '4-5 day journey',
    blurb: 'A legendary mountaintop citadel surrounded by cloud forests and stone paths.',
  },
  p18: {
    region: 'Amazonas, Brazil',
    vibe: 'River expedition',
    stay: '5 day boat route',
    blurb: 'Long river horizons and jungle scenery for a more immersive wilderness trip.',
  },
};

export function getPlaceDetails(place) {
  return (
    PLACE_DETAILS[place.id] ?? {
      region: 'Curated destination',
      vibe: 'Flexible getaway',
      stay: 'Plan your own pace',
      blurb: place.image.alt,
    }
  );
}
