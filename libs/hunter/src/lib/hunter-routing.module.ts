import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HunterComponent } from './hunter.component';

const routes: Routes = [{ path: '', component: HunterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HunterRoutingModule { }
