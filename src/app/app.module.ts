import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { WorldsModule } from './worlds/worlds.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    WorldsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
