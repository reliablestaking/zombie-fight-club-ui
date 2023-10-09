import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TutorialComponent } from './tutorial.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: TutorialComponent },
    ]),
  ],
  declarations: [TutorialComponent],
})
export class TutorialModule {}
