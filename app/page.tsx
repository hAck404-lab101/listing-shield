import { PlacesSearch } from "@/components/PlacesSearch";

const workflowSteps = [
  "Enter a business name and location",
  "Add official phone, website, or branch address if known",
  "Search Google Places from the server",
  "Review auto-scored results and change classifications manually"
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
          <a className="btn btn-primary" href="#search">Start search</a>
        </header>

        <section className="hero">
          <div className="card">
            <p className="eyebrow">Google Maps brand protection</p>
            <h1 className="hero-title">Search first. Sort suspicious listings after.</h1>
            <p className="hero-copy">
              Listing Shield now focuses on your preferred workflow: type a business name, add optional official details, search Google Places, then personally review which listings are original, branches, suspicious, or likely impersonators.
            </p>
            <div className="actions">
              <a className="btn btn-primary" href="#search">Search Google listings</a>
              <a className="btn" href="#workflow">View workflow</a>
            </div>
          </div>

          <div id="workflow" className="card">
            <p className="eyebrow">Current feature</p>
            <h2>Automatic search + human review</h2>
            <div className="score-list">
              {workflowSteps.map((step, index) => (
                <div className="score-item" key={step}>
                  <span>{step}</span>
                  <span className="score-points">0{index + 1}</span>
                </div>
              ))}
            </div>
            <p className="footer-note">
              This keeps the work fast without letting the system falsely accuse a business. You still make the final decision.
            </p>
          </div>
        </section>

        <div id="search">
          <PlacesSearch />
        </div>
      </div>
    </main>
  );
}
