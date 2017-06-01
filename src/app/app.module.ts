import { ActionsCreatorService } from './actions/actionsCreatorService';
import { BudgetEffects } from './effects/budget.effects';
import { CategoryTransactionsComponent } from './components/category-transactions/category-transactions';
import { NewCategoryComponent } from './components/new-category/new-category';
import { FormsModule } from '@angular/forms';
import { CategoryComponent } from './components/category/category';
import { BudgetHeaderComponent } from './components/budget-header/budget-header';
import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DBModule } from '@ngrx/db';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MaterialModule } from '@angular/material';

import { GoogleBooksService } from './services/google-books';

import { routes } from './routes';
import { reducer } from './reducers';
import { schema } from './db';
import { BudgetListPageComponent } from './containers/budget-list-page/budget-list-page.component';
import { CreateBudgetPageComponent } from './containers/create-budget-page/create-budget-page.component';
import { BudgetingPageComponent } from './containers/budgeting-page/budgeting-page.component';
import { EditCategoryPageComponent } from './containers/edit-category-page/edit-category-page.component';
import { AppComponent } from './containers/app/app.component';
import { BudgetingPageLeftNavComponent } from './containers/budgeting-page/budgeting-page-left-nav/budgeting-page-left-nav.component';
import { BudgetingPageMainComponent } from './containers/budgeting-page/budgeting-page-main/budgeting-page-main.component';
import { BudgetingPageRightNavComponent } from './containers/budgeting-page/budgeting-page-right-nav/budgeting-page-right-nav.component';
import { PieComponent } from './components/pie/pie.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    RouterModule.forRoot(routes, { useHash: false }),

    /**
     * StoreModule.provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.provideStore(reducer),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store and uses
     * the store as the single source of truth for the router's state.
     */
    RouterStoreModule.connectRouter(),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrumentOnlyWithExtension(),

    /**
     * EffectsModule.run() sets up the effects class to be initialized
     * immediately when the application starts.
     *
     * See: https://github.com/ngrx/effects/blob/master/docs/api.md#run
     */
    EffectsModule.run(BudgetEffects),

    /**
     * `provideDB` sets up @ngrx/db with the provided schema and makes the Database
     * service available.
     */
    DBModule.provideDB(schema)
  ],
  declarations: [
    BudgetHeaderComponent,
    CategoryComponent,
    NewCategoryComponent,
    CategoryTransactionsComponent,
    BudgetListPageComponent,
    CreateBudgetPageComponent,
    BudgetingPageComponent,
    EditCategoryPageComponent,
    AppComponent,
    BudgetingPageLeftNavComponent,
    BudgetingPageMainComponent,
    BudgetingPageRightNavComponent,
    PieComponent
  ],
  providers: [
    ActionsCreatorService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
