import { tricks, getTricksByIds } from "./tricks";

/**
 * Devuelve los IDs de trucos desbloqueados según el estado del usuario.
 * Regla: un truco está "available" si TODOS sus prerequisitos están
 * en estado "mastered" o "learning". En cualquier otro caso, "locked".
 *
 * Trucos sin prerequisitos siempre están "available".
 */
export function computeAvailability(
  statuses: Record<string, "locked" | "available" | "learning" | "mastered">
): Record<string, "locked" | "available" | "learning" | "mastered"> {
  const result: Record<string, "locked" | "available" | "learning" | "mastered"> = {};

  for (const trick of tricks) {
    if (statuses[trick.id] === "learning" || statuses[trick.id] === "mastered") {
      result[trick.id] = statuses[trick.id];
      continue;
    }
    if (trick.prerequisites.length === 0) {
      result[trick.id] = statuses[trick.id] === "mastered" ? "mastered" : "available";
      continue;
    }
    const allMet = trick.prerequisites.every(
      (pid) => statuses[pid] === "mastered" || statuses[pid] === "learning"
    );
    result[trick.id] = allMet ? "available" : "locked";
  }

  return result;
}

export { tricks, getTricksByIds };
