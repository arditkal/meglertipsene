import meglereData from "./meglere.json";

export type OmradeFrekvens = {
  navn: string;
  antall: number;
};

export type Megler = {
  id: number;
  navn: string;
  firma: string;
  tittel: string;
  telefon: string;
  telefon2: string;
  email: string;
  email2: string;
  finn_org_url: string;
  omrader: OmradeFrekvens[];
  byer: string[];
  antall_annonser: number;
};

export const alleMeglere: Megler[] = meglereData as Megler[];

function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

export function sokMeglere(query: string, limit = 24): Megler[] {
  const q = norm(query);
  if (q.length < 2) return [];

  const terms = q.split(/\s+/).filter(Boolean);

  const scored = alleMeglere.map((m) => {
    let score = 0;

    // Områdesøk — vektet etter frekvens
    for (const o of m.omrader) {
      const on = norm(o.navn);
      const freq = o.antall;

      if (on === q) {
        score += freq * 6;             // eksakt treff
      } else if (terms.every((t) => on.includes(t))) {
        score += freq * 3;             // alle termer matcher
      } else if (terms.some((t) => on.includes(t))) {
        score += freq * 1;             // delvis match
      }
    }

    // By-tag fra firmanavn
    for (const by of m.byer) {
      if (norm(by) === q || terms.some((t) => norm(by).includes(t))) {
        score += 12;
      }
    }

    // Firmanavn
    const fn = norm(m.firma);
    if (fn.includes(q)) score += 6;
    else if (terms.some((t) => fn.includes(t))) score += 2;

    // Meglernavn
    if (norm(m.navn).includes(q)) score += 4;

    return { m, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.m.antall_annonser - a.m.antall_annonser
    )
    .slice(0, limit)
    .map((s) => s.m);
}

export function hentMegler(id: number): Megler | undefined {
  return alleMeglere.find((m) => m.id === id);
}
