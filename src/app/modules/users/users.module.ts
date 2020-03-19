import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { RouterModule } from '@angular/router';
import { reducers } from '../../store';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from 'src/app/store/effects/users.effects';
import { ApplicationPipesModule } from '../pipes.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [UserListComponent, UserDetailComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('users', reducers.users ),
    EffectsModule.forFeature([UsersEffects]),
    RouterModule.forChild([
      {path: '', component: UserListComponent},
      {path: ':username', component: UserDetailComponent}
    ]),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatTableModule,
    ApplicationPipesModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatPaginatorModule
  ]
})
export class UsersModule { }
