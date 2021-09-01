export async function emitExceededQuota(res: Response) {
  if (!res.ok) {
    const er = await res.json();
    throw new Error(er.error.message);
  }
}
