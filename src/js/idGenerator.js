export default function generateId() {
  let timestampId = Date.now().toString();
  return timestampId;
}