export default function generateId() {
  const timestampBase36Id = Date.now().toString(36);
  return timestampBase36Id;
}