import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinalizedComponent } from './finalized.component';

const finalizedRoutes: Routes = [
  { path: 'compra-finalizada', component: FinalizedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(finalizedRoutes)],
  declarations: [],
  exports: [RouterModule]
})

export class FinalizedRoutingModule {}
