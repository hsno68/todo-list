export default function generateId() {
  let timestampBase36Id = Date.now().toString(36);
  return timestampBase36Id;
}