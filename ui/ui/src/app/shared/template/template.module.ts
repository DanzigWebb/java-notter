import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitModalComponent, TemplateComponent } from './template.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from "@angular/router";
import { MenuModule, ModalModule, NavbarModule } from "am-bulba";
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupsModule } from '@app/groups';
import { TooltipModule } from "../components/tooltip/tooltip.module";
import { RenameGroupDialog } from "./sidebar/rename-group.dialog";



@NgModule({
  declarations: [
    TemplateComponent,
    HeaderComponent,
    SidebarComponent,
    SubmitModalComponent,
    RenameGroupDialog,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NavbarModule,
    ReactiveFormsModule,
    GroupsModule,
    MenuModule,
    ModalModule,
    TooltipModule,
  ],
})
export class TemplateModule { }
