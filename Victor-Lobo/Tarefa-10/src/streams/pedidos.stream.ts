import { catchError, interval, map, of, retry, shareReplay } from "rxjs";
import { randomId, randomStatus } from "../utils/simulador";

export const pedidos$ = interval(2000).pipe(
    map(() => {
        // Simulação de falha com probabilidade de 10% (Tarefa 4.1)
        if (Math.random() < 0.1) {
            throw new Error('Falha na comunicação com o servidor!');
        }
        return {
            pedidoId: `PED-${Date.now()}`,
            status: randomStatus(),
            entregadorId: `ENT-${randomId()}`,
            timestamp: new Date()
        };
    }),
    // O tratamento de erro fica na fonte do stream, não nos pipelines dos
    // consumidores. Como pedidos$ usa shareReplay, um erro sem tratamento
    // aqui se propagaria para TODOS os subscribers 
    retry(3),
    catchError(erro => of({
        pedidoId: '',
        status: 'erro' as const,
        mensagem: erro.message,
        entregadorId: '',
        timestamp: new Date()
    })),
    // shareReplay garante que múltiplas subscrições compartilhem a mesma
    // execução do interval e recebam o último valor emitido ao se inscreverem.
    shareReplay({ bufferSize: 1, refCount: true })
);