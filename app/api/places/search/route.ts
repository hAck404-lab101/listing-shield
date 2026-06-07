import { NextResponse } from "next/server";
import { scoreCandidate } from "@/lib/scoring";

type SearchRequest = {
  query?: string;
  location?: string;
  officialPhone?: string;
  officialWebsite?: string;
  officialAddress?: string;
};

type GooglePlace = {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  nationalPhoneNumber?: string;
  internationalPhoneNumber?: string;
  websiteUri?: string;
  googleMapsUri?: string;
  rating?: number;
  userRatingCount?: number;
  businessStatus?: string;
};

const FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.nationalPhoneNumber",
  "places.internationalPhoneNumber",
  "places.websiteUri",
  "places.googleMapsUri",
  "places.rating",
  "places.userRatingCount",
  "places.businessStatus"
].join(",");

function clean(value?: string) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "Google Maps API key is not configured. Add GOOGLE_MAPS_API_KEY to .env.local."
        },
        { status: 500 }
      );
    }

    const body = (await request.json()) as SearchRequest;
    const query = clean(body.query);
    const location = clean(body.location);

    if (!query) {
      return NextResponse.json({ error: "Business/search name is required." }, { status: 400 });
    }

    const textQuery = location ? `${query} ${location}` : query;

    const googleResponse = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": FIELD_MASK
      },
      body: JSON.stringify({
        textQuery,
        maxResultCount: 20
      })
    });

    const payload = await googleResponse.json();

    if (!googleResponse.ok) {
      return NextResponse.json(
        {
          error: "Google Places search failed.",
          details: payload?.error?.message ?? "Unknown Google API error"
        },
        { status: googleResponse.status }
      );
    }

    const places = Array.isArray(payload.places) ? (payload.places as GooglePlace[]) : [];

    const results = places.map((place) => {
      const phone = place.internationalPhoneNumber || place.nationalPhoneNumber || "";
      const scored = scoreCandidate({
        name: place.displayName?.text,
        address: place.formattedAddress,
        phone,
        website: place.websiteUri,
        officialPhone: body.officialPhone,
        officialWebsite: body.officialWebsite,
        officialAddress: body.officialAddress
      });

      return {
        placeId: place.id ?? "",
        name: place.displayName?.text ?? "Unnamed listing",
        address: place.formattedAddress ?? "No address returned",
        phone: phone || "Not returned",
        website: place.websiteUri ?? "Not returned",
        mapsUrl: place.googleMapsUri ?? "",
        rating: place.rating ?? null,
        userRatingCount: place.userRatingCount ?? null,
        businessStatus: place.businessStatus ?? "UNKNOWN",
        score: scored.score,
        classification: scored.classification,
        reasons: scored.reasons
      };
    });

    results.sort((a, b) => b.score - a.score);

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Places search error", error);
    return NextResponse.json({ error: "Unexpected server error during search." }, { status: 500 });
  }
}
