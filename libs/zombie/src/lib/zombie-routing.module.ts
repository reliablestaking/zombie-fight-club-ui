import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZombieComponent } from './zombie.component';

const routes: Routes = [{ path: '', component: ZombieComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZombieRoutingModule { }
