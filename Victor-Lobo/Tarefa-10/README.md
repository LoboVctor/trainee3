# RxJS — Sistema de Monitoramento Reativo

## Como rodar o projeto

# 1. Instalar dependências

npm install

# 2. Executar em modo desenvolvimento (ts-node)

npx ts-node src/main.ts

## Descrição dos Streams

### gps$

Emite a cada 1 segundo um objeto com entregadorId, lat, lng, velocidade e timestamp. Utiliza interval + map + shareReplay para garantir que múltiplas subscrições compartilhem a mesma execução do intervalo e recebam sempre o dado mais recente.

### pedidos$

Emite a cada 2 segundos um objeto com pedidoId, status, entregadorId e timestamp. Simula falha de comunicação com probabilidade de 10% lançando um erro. O tratamento com retry(3) + catchError é aplicado dentro do próprio stream, antes do shareReplay. Isso é necessário porque shareReplay multicasta o fluxo para todos os subscribers — se o erro não fosse tratado na fonte, ele se propagaria para cada consumidor (statusCount$, painelEntregador$, a subscription de contagem) derrubando o processo. Com o tratamento na fonte, todos recebem um objeto neutro { status: 'erro', ... } e continuam funcionando normalmente.

### alertas$

Emite em intervalos aleatórios entre 3s e 8s um objeto com tipo, entregadorId, mensagem, severidade e timestamp. Utiliza defer + timer + repeat com factory de delay para recalcular o intervalo aleatório a cada nova emissão. O share() ao final garante multicast sem re-executar o defer para cada subscriber.

## Tarefa 3.1 — Justificativa do operador escolhido para painelEntregador$

Operadores escolhidos: merge + groupBy + mergeMap + scan

A abordagem usa merge() para unificar gpsEnriquecido$ e pedidos$ em um único stream tipado com campo tipo. Em seguida, groupBy() segmenta o fluxo por entregadorId, criando um observable por entregador. Dentro de cada grupo, scan() acumula o estado mais recente (ultimaLocalizacao, ultimoStatus, ultimaAtualizacao), emitindo a cada update.

## Tarefa 3.2 — Dashboard de Emergência

Quando um alerta de severidade 'alta' é emitido, o mergeMap abre um inner observable sobre velocidadeSuspeita$ filtrando pelo mesmo entregadorId. O takeUntil(timer(5000)) implementa a janela temporal de 5 segundos — se nenhum GPS suspeito for encontrado nesse intervalo, o inner observable expira sem emissão. O take(1) garante que, se a condição for satisfeita dentro da janela, apenas o primeiro match emita e o inner complete imediatamente.

## Dificuldades enfrentadas e soluções

Problema 1 — alertas$ emitia um Observable como valor

O stream alertas$ original usava switchMap((evento) => [evento, alertas$]). A intenção era criar um loop infinito que reemitisse o stream a cada ciclo, mas na prática o array [evento, alertas$] fazia o switchMap emitir o objeto Observable em si como valor — ao invés de se inscrever nele. Os subscribers recebiam uma instância de Observable onde esperavam um objeto de alerta.

Solução: Substituído por repeat({ delay: () => timer(randomDelay()) }) disponível a partir do RxJS 7. Após cada emissão do timer interno, o operador aguarda um novo delay aleatório antes de repetir — produzindo o comportamento de intervalo variável de forma declarativa e sem recursão.

Problema 2 — Crash por erro não tratado em pedidos$

Em execução, o processo derrubava com Error: Falha na comunicação com o servidor! sempre que a simulação de 10% disparava. O retry(3) + catchError estavam apenas no pipeline do statusCount$, mas pedidos$ usa shareReplay — o que significa que o mesmo erro se propagava simultaneamente para todos os outros subscribers (logComTimestamp('PEDIDOS'), painelEntregador$) que não tinham nenhuma proteção.

Solução: O tratamento de erro foi movido para dentro do pedidos.stream.ts, antes do shareReplay. Dessa forma, a falha é interceptada na fonte e todos os consumidores recebem um objeto seguro { status: 'erro', mensagem: '...' } em vez de um erro não tratado. O statusCount$ em main.ts já filtrava status === 'erro', por isso bastou remover o retry + catchError redundantes de lá.

## Operador Customizado — logComTimestamp

Implementado com tap, que observa os valores do fluxo sem alterá-los. Aceita um label opcional para identificar o stream no console.
