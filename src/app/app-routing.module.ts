import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OwnerListComponent} from './owners/owner-list/owner-list.component';
import {OwnerComponent} from './owners/owner/owner.component';

const routes: Routes = [
  {path: '', component: OwnerListComponent},
  {path: 'owner/:id', component: OwnerComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
