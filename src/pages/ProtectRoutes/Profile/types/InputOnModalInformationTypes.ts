export interface InputOnModalInformationProps {
  title: string;
  type: string;
  value: string;
  text: string;
  onInput: React.Dispatch<React.SetStateAction<string>>;
}