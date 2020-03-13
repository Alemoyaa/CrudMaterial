import { CardComponent } from './componentes/card/card.component';
import { HomeComponent } from './componentes/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'cards',component: CardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
