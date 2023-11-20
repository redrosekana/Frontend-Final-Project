export interface InputOnModalPasswordProps {
  title: string;
  type: string;
  value: string;
  text: string;
  isSubmit: boolean;
  onInput: React.Dispatch<React.SetStateAction<string>>;
  invalidConfirmPassword?: { text: string; status: boolean };
}
