import { CustomRouterStateSerializer } from './routerSerializer';
import { RoutingEffects } from './effects/routing.effects';
import { TransactionListPageComponent } from './pages/transaction-list-page/transaction-list-page.component';
import { AddTransactionPageComponent } from './pages/add-transaction-page/add-transaction-page.component';
import { ActionsCreatorService } from './actions/actionsCreatorService';
import { BudgetEffects } from './effects/budget.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './components/category/category';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DBModule } from '@ngrx/db';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  MatListModule, MatButtonModule, MatSnackBarModule, MatToolbarModule,
  MatIconModule, MatFormFieldModule, MatInputModule, MatChipsModule,
  MatRadioModule
} from '@angular/material';

import { routes } from './routes';
import { reducers, metaReducers } from './reducers';
import { schema } from './db';
import { BudgetListPageComponent } from './pages/budget-list-page/budget-list-page.component';
import { AddBudgetPageComponent } from './pages/add-budget-page/add-budget-page.component';
import { BudgetingPageComponent } from './pages/budgeting-page/budgeting-page.component';
import { AppComponent } from './pages/app/app.component';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';

import './app.rxjs-imports';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatListModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatChipsModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { useHash: false }),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([BudgetEffects, RoutingEffects]),
    DBModule.provideDB(schema),
    StoreRouterConnectingModule,
  ],
  declarations: [
    CategoryComponent,
    BudgetListPageComponent,
    AddBudgetPageComponent,
    BudgetingPageComponent,
    AddTransactionPageComponent,
    TransactionListPageComponent,
    AppComponent
  ],
  providers: [
    ActionsCreatorService,
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
