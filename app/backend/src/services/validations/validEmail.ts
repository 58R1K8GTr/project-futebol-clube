export default function validEmail(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email);
}
