import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { ListThemesPage } from './pages/list-themes/list-themes.page';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginPage,
    },
    {
        path: 'list-themes',
        component: ListThemesPage, canActivate: [AuthGuard],
    },
];
