import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, NotFoundException } from "@nestjs/common"
import { VeiculosService } from "./veiculos.service"
import { CreateVeiculoDto } from "./dto/create-veiculo.dto"
import { UpdateVeiculoDto } from "./dto/update-veiculo.dto"


@Controller('veiculos')
export class VeiculosController {
    constructor(private readonly service: VeiculosService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() body: CreateVeiculoDto) {
        return this.service.create(body)
    }

    @Get()
    findAll() {
        return this.service.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        const veiculo = this.service.findOne(Number(id))

        if (!veiculo) {
            throw new NotFoundException('Veículo não encontrado!')
        }
        return veiculo
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    update(
        @Param('id') id: string,
        @Body() body: UpdateVeiculoDto
    ) {
        const update = this.service.update(Number(id), body)

        if (!update) {
            throw new NotFoundException('Veículo não encontrado!')
        }
        return update
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        const deleted = this.service.remove(Number(id))

        if (!deleted) {
            throw new NotFoundException('Veículo não encontrado!')
        }
    }
}