// Gerador de numero inteiro aleatório. O resultado é usado em alguns dos outros geradores
export function randomInterv(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// Gerador de Id 
export function randomId() {
    return String(randomInterv(1, 5)).padStart(3, '0')
}

// Gerador de Latidude
export function randomLat() {
    return Number((Math.random() * 180 - 90).toFixed(6))
}

// Gerador de Longitude
export function randomLng() {
    return Number((Math.random() * 360 - 180).toFixed(6))
}

// Gerador de Velocidade
export function randomVel() {
    return randomInterv(0, 80)
}

// Gerador de Status
export function randomStatus() {
    const status = ['coletado', 'em_rota', 'entregue', 'falhou']
    return status[randomInterv(0, status.length - 1)]
}

// Gerador de Alerta
export function randomAlerta() {
    const alerta = ['atraso', 'veiculo_parado', 'rota_desviada']
    return alerta[randomInterv(0, alerta.length - 1)]
}

// Gerador de Severidade
export function randomSev() {
    const sev = ['baixa', 'media', 'alta']
    return sev[randomInterv(0, sev.length - 1)]
}
