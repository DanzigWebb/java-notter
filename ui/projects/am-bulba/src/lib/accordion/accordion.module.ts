import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionGroup, AccordionContent, AccordionHeader, Accordion } from './accordion';


@NgModule({
  declarations: [
    AccordionGroup,
    Accordion,
    AccordionHeader,
    AccordionContent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AccordionGroup,
    Accordion,
    AccordionHeader,
    AccordionContent,
  ],
})
export class AccordionModule {
}
