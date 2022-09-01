export interface IChoiceProp {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface IChoiceDetail {
  target: HTMLGascoSelectElement;
  detail: string;
}