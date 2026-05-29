import meglereData from "./meglere.json";

export type Megler = {
  id: number;
  navn: string;
  firma: string;
  org_id: string;
  tittel: string;
  telefon: string;
  telefon2: string;
  email: string;
  email2: string;
  finn_org_url: string;
  omrader: string[];
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

    for (const omrade of m.omrader) {
      const o = norm(omrade);
      if (o === q) {
        score += 20;
      } else if (terms.every((t) => o.includes(t))) {
        score += 10;
      } else if (terms.some((t) => o.includes(t))) {
        score += 4;
      }
    }

    const firmaNorm = norm(m.firma);
    if (firmaNorm.includes(q)) score += 5;
    else if (terms.some((t) => firmaNorm.includes(t))) score += 2;

    const navnNorm = norm(m.navn);
    if (navnNorm.includes(q)) score += 3;

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
