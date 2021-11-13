import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TemplateModule } from "./shared/template/template.module";
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from "./store/store.module";
import { AuthService } from "@app/auth";
import { Config } from "@app/config";
import { InterceptorsModule } from "@app/interceptors";
import { TagsModule } from './shared/components/tags/tags.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TemplateModule,

    StoreModule,
    InterceptorsModule,
    TagsModule,
  ],
  providers: [
    AuthService,
    Config
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
