import { defer, map, repeat, share, timer } from "rxjs";
import { randomAlerta, randomId, randomSev } from "../utils/simulador";

function randomDelay() {
    return Math.floor(Math.random() * (8000 - 3000 + 1)) + 3000;
}
export const alertas$ = defer(() =>
    timer(randomDelay()).pipe(
        map(() => ({
            tipo: randomAlerta(),
            entregadorId: `ENT-${randomId()}`,
            mensagem: 'Atualização da entrega',
            severidade: randomSev(),
            timestamp: new Date(),
        })),
        repeat({ delay: () => timer(randomDelay()) })
    )
).pipe(share());