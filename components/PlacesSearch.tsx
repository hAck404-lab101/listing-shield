"use client";

import { useMemo, useState } from "react";

type PlaceResult = {
  placeId: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  mapsUrl: string;
  rating: number | null;
  userRatingCount: number | null;
  businessStatus: string;
  score: number;
  classification: string;
  reasons: string[];
};

type SearchState = {
  query: string;
  location: string;
  officialPhone: string;
  officialWebsite: string;
  officialAddress: string;
};

const classificationOptions = [
  "likely_original_or_branch",
  "needs_review",
  "suspicious_duplicate",
  "likely_impersonator"
];

function formatClassification(value: string) {
  return value.replaceAll("_", " ");
}

function getBadgeClass(classification: string) {
  if (classification === "likely_impersonator") return "badge badge-danger";
  if (classification === "suspicious_duplicate") return "badge badge-warning";
  if (classification === "likely_original_or_branch") return "badge badge-success";
  return "badge";
}

export function PlacesSearch() {
  const [form, setForm] = useState<SearchState>({
    query: "",
    location: "",
    officialPhone: "",
    officialWebsite: "",
    officialAddress: ""
  });
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [selectedClassifications, setSelectedClassifications] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const summary = useMemo(() => {
    return results.reduce(
      (acc, result) => {
        const classification = selectedClassifications[result.placeId] ?? result.classification;
        acc.total += 1;
        if (classification === "likely_original_or_branch") acc.original += 1;
        if (classification === "needs_review") acc.review += 1;
        if (classification === "suspicious_duplicate") acc.suspicious += 1;
        if (classification === "likely_impersonator") acc.impersonator += 1;
        return acc;
      },
      { total: 0, original: 0, review: 0, suspicious: 0, impersonator: 0 }
    );
  }, [results, selectedClassifications]);

  function updateField(field: keyof SearchState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function runSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setResults([]);
    setSelectedClassifications({});

    try {
      const response = await fetch("/api/places/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Search failed");
      }

      setResults(payload.results ?? []);
    } catch (searchError) {
      setError(searchError instanceof Error ? searchError.message : "Search failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="search-workspace">
      <form className="card search-card" onSubmit={runSearch}>
        <div>
          <p className="eyebrow">Live Google Places workflow</p>
          <h2>Search listings automatically</h2>
          <p className="hero-copy">
            Enter the business name, then add any official details you know. Listing Shield will search Google Places and score each result for review.
          </p>
        </div>

        <div className="form-grid">
          <label>
            Business/search name <span>*</span>
            <input
              required
              value={form.query}
              onChange={(event) => updateField("query", event.target.value)}
              placeholder="Example: Flicks and Licks"
            />
          </label>

          <label>
            Search location
            <input
              value={form.location}
              onChange={(event) => updateField("location", event.target.value)}
              placeholder="Example: Accra, Ghana"
            />
          </label>

          <label>
            Official phone number
            <input
              value={form.officialPhone}
              onChange={(event) => updateField("officialPhone", event.target.value)}
              placeholder="Optional"
            />
          </label>

          <label>
            Official website
            <input
              value={form.officialWebsite}
              onChange={(event) => updateField("officialWebsite", event.target.value)}
              placeholder="https://official-site.com"
            />
          </label>

          <label className="form-wide">
            Official branch/location/address
            <input
              value={form.officialAddress}
              onChange={(event) => updateField("officialAddress", event.target.value)}
              placeholder="Example: East Legon, Accra"
            />
          </label>
        </div>

        <div className="actions">
          <button className="btn btn-primary" type="submit" disabled={isLoading}>
            {isLoading ? "Searching..." : "Search Google listings"}
          </button>
          <button
            className="btn"
            type="button"
            onClick={() => {
              setForm({ query: "", location: "", officialPhone: "", officialWebsite: "", officialAddress: "" });
              setResults([]);
              setSelectedClassifications({});
              setError("");
            }}
          >
            Reset
          </button>
        </div>

        {error ? <div className="error-box">{error}</div> : null}
      </form>

      <div className="stat-grid compact-stats">
        <div className="stat-card"><div className="stat-label">Results</div><div className="stat-value">{summary.total}</div></div>
        <div className="stat-card"><div className="stat-label">Original/branch</div><div className="stat-value">{summary.original}</div></div>
        <div className="stat-card"><div className="stat-label">Suspicious</div><div className="stat-value">{summary.suspicious}</div></div>
        <div className="stat-card"><div className="stat-label">Likely fake</div><div className="stat-value">{summary.impersonator}</div></div>
      </div>

      <div className="card results-card">
        <div className="results-header">
          <div>
            <p className="eyebrow">Search results</p>
            <h2>Review and sort listings</h2>
          </div>
          <span className="badge">Manual changes stay on screen for review</span>
        </div>

        {results.length === 0 ? (
          <p className="footer-note">No results yet. Search a business name to begin.</p>
        ) : (
          <div className="results-list">
            {results.map((result) => {
              const classification = selectedClassifications[result.placeId] ?? result.classification;

              return (
                <article className="result-item" key={result.placeId || result.name}>
                  <div className="result-main">
                    <div>
                      <h3>{result.name}</h3>
                      <p>{result.address}</p>
                      <p className="meta-line">Phone: {result.phone} · Website: {result.website}</p>
                      <p className="meta-line">
                        Rating: {result.rating ?? "N/A"} · Reviews: {result.userRatingCount ?? "N/A"} · Status: {result.businessStatus}
                      </p>
                      {result.mapsUrl ? <a className="map-link" href={result.mapsUrl} target="_blank" rel="noreferrer">Open on Google Maps</a> : null}
                    </div>
                    <div className="result-score">
                      <span>Score</span>
                      <strong>{result.score}</strong>
                    </div>
                  </div>

                  <div className="result-controls">
                    <span className={getBadgeClass(classification)}>{formatClassification(classification)}</span>
                    <select
                      value={classification}
                      onChange={(event) =>
                        setSelectedClassifications((current) => ({ ...current, [result.placeId]: event.target.value }))
                      }
                    >
                      {classificationOptions.map((option) => (
                        <option key={option} value={option}>{formatClassification(option)}</option>
                      ))}
                    </select>
                  </div>

                  <ul className="reason-list">
                    {result.reasons.map((reason) => (
                      <li key={reason}>{reason}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
