import { Route } from '@angular/router';
import { Criacao } from './components/criacao/criacao';
import { Listagem } from './components/listagem/listagem';

export const routes: Route[] = [
    // Rota obrigatória (Caminho raiz) 
    {
        path: '',
        redirectTo: 'pagina-inicial',
        pathMatch: 'full'
    },
    //Rotas normais
    {
        path:'pagina-inicial',
        component: Listagem
    },
    {
        path:'criacao',
        component: Criacao
    }
]
