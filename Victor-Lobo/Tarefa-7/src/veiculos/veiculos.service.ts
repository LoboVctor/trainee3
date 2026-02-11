import { Injectable } from "@nestjs/common"
import { DB } from "src/database"
import { CreateVeiculoDto } from "./dto/create-veiculo.dto"
import { Veiculo, UpdateVeiculoDto } from "./dto/update-veiculo.dto"

@Injectable()
export class VeiculosService {

    create(data: CreateVeiculoDto) {
        const stmt = DB.prepare(`
            INSERT INTO veiculos (modelo, ano)
            VALUES (?, ?)
        `)

        const resultado = stmt.run(data.modelo, data.ano)

        return {
            id: resultado.lastInsertRowid,
            model: data.modelo,
            year: data.ano,
        }
    }

    findAll() {
        const stmt = DB.prepare(`SELECT * FROM veiculos`)
        return stmt.all()
    }

    findOne(id: number) {
        const stmt = DB.prepare(`SELECT * FROM veiculos WHERE id = ?`)
        return stmt.get(id)
    }

    update(id: number, data: UpdateVeiculoDto) {
        const veiculo = this.findOne(id) as Veiculo | null

        if (!veiculo) {
            return null
        }

        const stmt = DB.prepare(`
            UPDATE veiculos
            SET modelo = ?, ano = ? WHERE id = ?`)

        stmt.run(
            data.modelo ?? veiculo.modelo,
            data.ano ?? veiculo.ano,
            id
        )

        return this.findOne(id)
    }

    remove(id: number) {
        const stmt = DB.prepare(`DELETE FROM veiculos WHERE id = ?`)
        const resultado = stmt.run(id)

        return resultado.changes > 0
    }
}