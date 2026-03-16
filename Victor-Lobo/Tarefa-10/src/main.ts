import {
    filter,
    groupBy,
    map,
    merge,
    mergeMap,
    scan,
    Subject,
    take,
    takeUntil,
    timer,
} from "rxjs";
import { gps$ } from "./streams/gps.stream";
import { pedidos$ } from "./streams/pedidos.stream";
import { alertas$ } from "./streams/alertas.stream";
import { logComTimestamp } from "./operadores/custom.operadores";

const destroy$ = new Subject<void>();

let gpsCount = 0;
let pedidosCount = 0;
let alertasCount = 0;


// TAREFA 2 

const velocidadeSuspeita$ = gps$.pipe(
    filter(({ velocidade }) => velocidade > 60)
);

const statusCount$ = pedidos$.pipe(
    scan((acc: Record<string, number>, pedido: any) => {
        if (pedido.status === 'erro') return acc;
        return {
            ...acc,
            [pedido.status]: (acc[pedido.status] ?? 0) + 1
        };
    }, {} as Record<string, number>)
);

const alertasCriticos$ = alertas$.pipe(
    filter(({ severidade }) => severidade === 'alta' || severidade === 'media')
);

const gpsEnriquecido$ = gps$.pipe(
    map(gps => ({
        ...gps,
        regiao: gps.lat > 0 ? 'Norte' : 'Sul'
    }))
);


// TAREFA 3 


const eventos$ = merge(
    gpsEnriquecido$.pipe(map(g => ({ tipo: 'gps', payload: g }))),
    pedidos$.pipe(map(p => ({ tipo: 'pedido', payload: p })))
);

const painelEntregador$ = eventos$.pipe(
    groupBy(evt => evt.payload.entregadorId),
    mergeMap(grupo$ => grupo$.pipe(
        scan((state: any, evt: any) => {
            if (evt.tipo === 'gps') {
                state.ultimaLocalizacao = {
                    lat: evt.payload.lat,
                    lng: evt.payload.lng,
                    velocidade: evt.payload.velocidade,
                    // gpsEnriquecido$ já calcula "regiao" — basta propagá-la aqui
                    regiao: evt.payload.regiao
                };
            } else if (evt.tipo === 'pedido') {
                state.ultimoStatus = evt.payload.status;
            }
            state.entregadorId = evt.payload.entregadorId;
            state.ultimaAtualizacao = new Date();

            return { ...state };
        }, {})
    ))
);

const emergencia$ = alertasCriticos$.pipe(
    filter(a => a.severidade === 'alta'),

    mergeMap(alerta =>
        velocidadeSuspeita$.pipe(
            filter(gps => gps.entregadorId === alerta.entregadorId),
            takeUntil(timer(5000)),
            take(1),
            map(gps => ({
                entregadorId: alerta.entregadorId,
                alerta,
                gps
            }))
        )
    )
);


// TAREFA 4 

gps$
    .pipe(takeUntil(destroy$), logComTimestamp('GPS'))
    .subscribe(() => gpsCount++);

pedidos$
    .pipe(takeUntil(destroy$), logComTimestamp('PEDIDOS'))
    .subscribe(() => pedidosCount++);

alertas$
    .pipe(takeUntil(destroy$), logComTimestamp('ALERTAS'))
    .subscribe(() => alertasCount++);

statusCount$
    .pipe(takeUntil(destroy$), logComTimestamp('STATUS_COUNT'))
    .subscribe();

painelEntregador$
    .pipe(takeUntil(destroy$), logComTimestamp('PAINEL'))
    .subscribe();

emergencia$
    .pipe(takeUntil(destroy$), logComTimestamp('EMERGENCIA'))
    .subscribe();


setTimeout(() => {
    destroy$.next();
    destroy$.complete();

    console.log('\n ─────────── RESUMO ───────────');
    console.log('GPS:     ', gpsCount);
    console.log('Pedidos: ', pedidosCount);
    console.log('Alertas: ', alertasCount);
}, 30000);