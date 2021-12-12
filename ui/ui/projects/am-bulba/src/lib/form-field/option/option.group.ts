import { OptionComponent } from './option.component';

export interface AmOptionGroup {
  // <am-option> call this method when it checked
  onOptionCheck: (option: OptionComponent) => void
}
