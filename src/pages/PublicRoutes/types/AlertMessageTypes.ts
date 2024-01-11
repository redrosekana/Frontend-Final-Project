export interface AlertMessageProps {
  title: string;
  text: string;
  icon: "error" | "success" | "question" | "success" | "warning";
  color: string;
}
