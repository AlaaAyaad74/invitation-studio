/** Link that opens one film in the /videos modal. */
export function videoSharePath(id: string) {
  return `/videos?film=${encodeURIComponent(id)}`;
}
