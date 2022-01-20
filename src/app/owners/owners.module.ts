import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwnerComponent } from './owner/owner.component';


@NgModule({
  declarations: [
    OwnerListComponent,
    OwnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [OwnerListComponent]
})
export class OwnersModule { }
