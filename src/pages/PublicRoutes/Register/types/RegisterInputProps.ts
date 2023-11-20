export interface RegisterInputProps {
  label: string;
  type: string;
  value: string;
  onInput: React.Dispatch<React.SetStateAction<string>>;
}
