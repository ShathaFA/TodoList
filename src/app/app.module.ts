import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    FormsModule,
    // RouterModule.forRoot([]) // Define your routes here if needed
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
