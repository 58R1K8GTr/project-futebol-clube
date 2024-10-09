export default function fieldsExist(fields: string[]) {
  return fields.every(Boolean);
}
