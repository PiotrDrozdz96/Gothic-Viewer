import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { WorldsModule } from './worlds/worlds.module';
// import { WorldsComponent } from './worlds/worlds.component';

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
