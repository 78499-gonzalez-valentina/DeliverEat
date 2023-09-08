import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PedidoLoQueSeaComponent } from './pedido-lo-que-sea/pedido-lo-que-sea.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GoogleMapsModule} from "@angular/google-maps";
import { CiudadComponent } from './ciudad/ciudad.component';



@NgModule({
  declarations: [
    AppComponent,
    PedidoLoQueSeaComponent,
    CiudadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
