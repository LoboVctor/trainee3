import { interval, map, shareReplay } from "rxjs";
import { randomId, randomLat, randomLng, randomVel } from "../utils/simulador";

export const gps$ = interval(1000).pipe(
    map(() => ({
        entregadorId: `ENT-${randomId()}`,
        lat: randomLat(),
        lng: randomLng(),
        velocidade: randomVel(),
        timestamp: new Date()
    })),
    // Uso do shareReplay para evitar inconsistência de dados devido as múltiplas
    // subscrições: sem ele, cada subscribe() criaria uma execução independente
    // do interval, gerando dados diferentes para o mesmo instante.
    shareReplay({ bufferSize: 1, refCount: true })
)