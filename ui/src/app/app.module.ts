import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TemplateModule } from './shared/template/template.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from './store/store.module';
import { AuthService } from '@app/auth';
import { Config } from '@app/config';
import { InterceptorsModule } from '@app/interceptors';
import { TagsModule } from './shared/components/tags/tags.module';
import { initData } from './app-init-data';
import { AppService } from './app.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

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
    Config,
    {
      provide: APP_INITIALIZER,
      useFactory: initData,
      deps: [AppService],
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
