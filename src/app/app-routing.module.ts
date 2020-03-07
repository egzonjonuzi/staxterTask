import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './shared/components/layout/layout.component';

const routes: Routes = [
    { path: '', component:  LayoutComponent,
        children: [
            {
                path: '',
                children: [
                    { path: '', loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule) }
                ]
            }
        ]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
