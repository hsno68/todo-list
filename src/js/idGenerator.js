export default function generateId() {
  let timestampId = Date.now().toString(36);
  return timestampId;
}