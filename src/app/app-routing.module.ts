import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'auth', component: AuthComponent },

  {
    path: 'card/:pokemonId',
    loadChildren: () =>
      import('./components/pokemon-card/pokemon-card.module').then(
        (m) => m.PokemonCardModule
      ),
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('./components/error-page/error-page.module').then(
        (m) => m.ErrorModule
      ),
  },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
