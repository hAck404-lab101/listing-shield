export type CandidateClassification =
  | "likely_original_or_branch"
  | "needs_review"
  | "suspicious_duplicate"
  | "likely_impersonator";

export type ScoreInput = {
  name?: string;
  address?: string;
  phone?: string;
  website?: string;
  officialPhone?: string;
  officialWebsite?: string;
  officialAddress?: string;
};

export type ScoreResult = {
  score: number;
  classification: CandidateClassification;
  reasons: string[];
};

function normalize(value?: string) {
  return value?.toLowerCase().replace(/[^a-z0-9]/g, "").trim() ?? "";
}

function normalizePhone(value?: string) {
  return value?.replace(/[^0-9+]/g, "").trim() ?? "";
}

function hasMeaningfulOverlap(a?: string, b?: string) {
  const first = normalize(a);
  const second = normalize(b);

  if (!first || !second) return false;
  return first.includes(second) || second.includes(first);
}

export function scoreCandidate(input: ScoreInput): ScoreResult {
  let score = 0;
  const reasons: string[] = [];

  const candidatePhone = normalizePhone(input.phone);
  const officialPhone = normalizePhone(input.officialPhone);
  const candidateWebsite = normalize(input.website);
  const officialWebsite = normalize(input.officialWebsite);

  if (officialPhone && candidatePhone) {
    if (candidatePhone === officialPhone || candidatePhone.endsWith(officialPhone) || officialPhone.endsWith(candidatePhone)) {
      score -= 35;
      reasons.push("Phone matches official phone");
    } else {
      score += 25;
      reasons.push("Phone differs from official phone");
    }
  }

  if (officialWebsite && candidateWebsite) {
    if (candidateWebsite.includes(officialWebsite) || officialWebsite.includes(candidateWebsite)) {
      score -= 35;
      reasons.push("Website matches official website");
    } else {
      score += 20;
      reasons.push("Website differs from official website");
    }
  }

  if (input.officialAddress && input.address) {
    if (hasMeaningfulOverlap(input.address, input.officialAddress)) {
      score -= 20;
      reasons.push("Address/location looks close to official location");
    } else {
      score += 15;
      reasons.push("Address/location differs from official location");
    }
  }

  if (!input.phone) {
    score += 10;
    reasons.push("No phone number returned for listing");
  }

  if (!input.website) {
    score += 10;
    reasons.push("No website returned for listing");
  }

  if (score <= 0) {
    return {
      score: Math.max(score, 0),
      classification: "likely_original_or_branch",
      reasons: reasons.length ? reasons : ["Matches or lacks enough risk signals"]
    };
  }

  if (score >= 55) {
    return { score, classification: "likely_impersonator", reasons };
  }

  if (score >= 30) {
    return { score, classification: "suspicious_duplicate", reasons };
  }

  return { score, classification: "needs_review", reasons };
}
