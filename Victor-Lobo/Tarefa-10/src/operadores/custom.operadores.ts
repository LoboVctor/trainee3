import { tap } from "rxjs";

export function logComTimestamp(label?: string) {
    // Uso do tap para apenas observar o que passa pelo fluxo, sem alterar o valor
    return tap((valor) => {
        const now = new Date();
        const horaFormatada = now.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });

        console.log(`[${label ?? 'LOG'}] ${horaFormatada} ->`, valor);
    });
}