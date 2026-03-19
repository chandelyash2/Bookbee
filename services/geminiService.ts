export async function generateBookArt(prompt: string): Promise<string | null> {
  const res = await fetch("/api/generate-art", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.image ?? null;
}