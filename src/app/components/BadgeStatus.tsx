import { Badge } from "@/components/ui/badge";

export function BadgeStatus({
  textMessage,
  variant,
}: {
  textMessage: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
}) {
  return <Badge variant={variant}>{textMessage}</Badge>;
}
