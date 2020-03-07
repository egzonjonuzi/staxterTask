import {ModuleWithProviders, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LatestRatesComponent} from './components/latest-rates/latest-rates.component';
import {HistoryChartRatesComponent} from './components/history-chart-rates/history-chart-rates.component';
import {TopFiveDiffComponent} from './components/top-five-diff/top-five-diff.component';


export const routes: Routes = [
  {path: '', redirectTo: 'latest-rates', pathMatch: 'full'},
  {path: 'latest-rates', component: LatestRatesComponent},
  {path: 'latest-rates/:base', component: LatestRatesComponent},
  {path: 'history-chart-rates', component: HistoryChartRatesComponent},
  {path: 'history-chart-rates/:base', component: HistoryChartRatesComponent},
  {path: 'history-chart-rates/:base/:rowBase', component: HistoryChartRatesComponent},
  {path: 'top-five-diff', component: TopFiveDiffComponent},
  {path: 'top-five-diff/:base', component: TopFiveDiffComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
export const routing: ModuleWithProviders = RouterModule.forChild(routes)
