import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PedidoLoQueSeaComponent} from "./pedido-lo-que-sea/pedido-lo-que-sea.component";

const routes: Routes = [
  { path: 'pedido-lo-que-sea', component: PedidoLoQueSeaComponent },
  { path: '**', pathMatch: 'full', component: PedidoLoQueSeaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
