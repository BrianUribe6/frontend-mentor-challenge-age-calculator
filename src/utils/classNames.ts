export default function cn(...args: (string | boolean | undefined)[]) {
  return args.filter(Boolean).join(" ");
}
