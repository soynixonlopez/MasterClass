/**
 * Lee NEXT_PUBLIC_YOUTUBE_VIDEO_ID: solo el ID (ej. abc123) o URL completa de YouTube.
 */
export function getYoutubeEmbedSrc(): string | null {
  const raw = process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_ID?.trim();
  if (!raw) return null;

  let id = raw;

  try {
    if (raw.includes("youtube.com/watch")) {
      const u = new URL(raw);
      id = u.searchParams.get("v") ?? raw;
    } else if (raw.includes("youtu.be/")) {
      const u = new URL(raw.split("&")[0]);
      id = u.pathname.replace(/^\//, "").split("/").pop() ?? raw;
    } else if (raw.includes("youtube.com/shorts/")) {
      const u = new URL(raw);
      const parts = u.pathname.split("/").filter(Boolean);
      id = parts[parts.length - 1] ?? raw;
    }
  } catch {
    /* usar raw como ID */
  }

  id = id.replace(/[^a-zA-Z0-9_-]/g, "");
  if (id.length < 6) return null;

  return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
}
