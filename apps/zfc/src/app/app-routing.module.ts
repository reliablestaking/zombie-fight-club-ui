import { NgModule } from '@angular/core';
import { PreloadAllModules, Route, RouterModule } from '@angular/router';
import { AuthGuard } from '@zfc-ui/auth';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('@zfc-ui/home').then((m) => m.HomeModule),
  },
  {
    path: 'promote',
    loadChildren: () => import('@zfc-ui/promote').then((m) => m.PromoteModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'faq',
    loadChildren: () => import('@zfc-ui/faq').then((m) => m.FaqModule),
  },
  {
    path: 'achievements',
    loadChildren: () =>
      import('@zfc-ui/achievements').then((m) => m.AchievementsModule),
  },
  {
    path: 'zombie',
    loadChildren: () => import('@zfc-ui/zombie').then((m) => m.ZombieModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'hunter',
    loadChildren: () => import('@zfc-ui/hunter').then((m) => m.HunterModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'tutorial',
    loadChildren: () =>
      import('@zfc-ui/tutorial').then((m) => m.TutorialModule),
  },
  {
    path: 'leaders',
    loadChildren: () => import('@zfc-ui/leaders').then((m) => m.LeadersModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
