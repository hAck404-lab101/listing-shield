const stats = [
  { label: "Active audits", value: "3" },
  { label: "Candidates found", value: "41" },
  { label: "High-risk listings", value: "18" },
  { label: "Reported", value: "9" }
];

const listings = [
  {
    name: "Flicks and Licks - Accra",
    address: "East Legon, Accra",
    score: 86,
    status: "Likely impersonator",
    badge: "badge-danger"
  },
  {
    name: "Flicks & Licks Restaurant",
    address: "Osu, Accra",
    score: 68,
    status: "Suspicious duplicate",
    badge: "badge-warning"
  },
  {
    name: "Flicks and Licks Official",
    address: "Verified branch",
    score: 12,
    status: "Official branch",
    badge: "badge-success"
  }
];

const scoreRules = [
  { label: "Similar business name", points: "+30" },
  { label: "Different phone number", points: "+25" },
  { label: "Different website/social link", points: "+20" },
  { label: "Exact official Place ID", points: "-100" }
];

export default function Home() {
  return (
    <main className="shell">
      <div className="container">
        <header className="topbar">
          <div className="brand-lockup">
            <div className="logo-mark">LS</div>
            <div>
              <p className="eyebrow">DiMiles audit system</p>
              <h2>Listing Shield</h2>
            </div>
          </div>
          <a className="btn btn-primary" href="#dashboard">Launch test dashboard</a>
        </header>

        <section className="hero">
          <div className="card">
            <p className="eyebrow">Google Maps brand protection</p>
            <h1 className="hero-title">Find suspicious listings before they confuse customers.</h1>
            <p className="hero-copy">
              Listing Shield helps you organize official listings, suspicious duplicates, possible impersonators, evidence notes, and reporting progress in one clean dashboard.
            </p>
            <div className="actions">
              <a className="btn btn-primary" href="#dashboard">View dashboard</a>
              <a className="btn" href="#scoring">View scoring rules</a>
            </div>
          </div>

          <div className="card">
            <p className="eyebrow">Current MVP mode</p>
            <h2>Manual audit first</h2>
            <p className="hero-copy">
              This test version uses mock data. Next we add audit creation, manual listing entry, Supabase storage, then Google Places search.
            </p>
            <p className="footer-note">
              Safe rule: this app supports audits and reporting workflows. It does not scrape Google Maps or promise automatic takedowns.
            </p>
          </div>
        </section>

        <section id="dashboard" className="stat-grid">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
            </div>
          ))}
        </section>

        <section className="grid-two">
          <div className="card">
            <p className="eyebrow">Candidate listings</p>
            <h2>Audit preview</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Listing</th>
                  <th>Location</th>
                  <th>Score</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing) => (
                  <tr key={listing.name}>
                    <td>{listing.name}</td>
                    <td>{listing.address}</td>
                    <td>{listing.score}</td>
                    <td><span className={`badge ${listing.badge}`}>{listing.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div id="scoring" className="card">
            <p className="eyebrow">Suspicion score</p>
            <h2>Scoring preview</h2>
            <div className="score-list">
              {scoreRules.map((rule) => (
                <div className="score-item" key={rule.label}>
                  <span>{rule.label}</span>
                  <span className="score-points">{rule.points}</span>
                </div>
              ))}
            </div>
            <p className="footer-note">
              Scores are internal triage signals only. The operator must verify each listing before reporting it.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
