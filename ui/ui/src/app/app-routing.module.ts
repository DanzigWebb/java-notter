import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from "./shared/template/template.component";

const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
    children: [
      {
        path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'group', loadChildren: () => import('./pages/group/group.module') .then(m => m.GroupModule)
      },
      {
        path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module') .then(m => m.DashboardModule)
      },
      {
        path: 'note', loadChildren: () => import('./pages/note/note.module') .then(m => m.NoteModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
