export interface PickerInternalChangeEventDetail {
  useInputMode: boolean;
  inputModeColumn?: HTMLGascoPickerColumnInternalElement;
}

export interface PickerInternalCustomEvent extends CustomEvent {
  target: HTMLGascoPickerInternalElement;
  detail: PickerInternalChangeEventDetail;
}
