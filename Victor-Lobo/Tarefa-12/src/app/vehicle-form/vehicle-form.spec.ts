import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormControl } from '@angular/forms';
import { VehicleFormComponent } from './vehicle-form';
 
describe('VehicleFormComponent', () => {
  let component: VehicleFormComponent;
  let fixture: ComponentFixture<VehicleFormComponent>;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleFormComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
 
    fixture = TestBed.createComponent(VehicleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
 
  it('deve inicializar o formulario como invalido', () => {
    expect(component.form.valid).toBe(false);
  });
 
  it('deve marcar todos os campos como tocados ao tentar enviar invalido', () => {
    component.onSubmit();
    expect(component.form.get('nome')?.touched).toBe(true);
    expect(component.form.get('email')?.touched).toBe(true);
  });
 
  it('deve manter sucesso como false ao enviar formulario invalido', () => {
    component.onSubmit();
    expect(component.sucesso).toBe(false);
  });
 
  // --- FormArray ---
 
  describe('FormArray: proprietariosAnteriores', () => {
    it('deve iniciar vazio', () => {
      expect(component.proprietariosAnteriores.length).toBe(0);
    });
 
    it('deve adicionar um grupo de proprietario', () => {
      component.adicionarProprietario();
      expect(component.proprietariosAnteriores.length).toBe(1);
    });
 
    it('deve adicionar multiplos proprietarios', () => {
      component.adicionarProprietario();
      component.adicionarProprietario();
      expect(component.proprietariosAnteriores.length).toBe(2);
    });
 
    it('deve remover um proprietario pelo indice', () => {
      component.adicionarProprietario();
      component.adicionarProprietario();
      component.removerProprietario(0);
      expect(component.proprietariosAnteriores.length).toBe(1);
    });
 
    it('deve invalidar o formulario quando campos do proprietario estiverem vazios', () => {
      component.adicionarProprietario();
      expect(component.form.valid).toBe(false);
    });
 
    it('deve limpar todos os proprietarios ao resetar', () => {
      component.adicionarProprietario();
      component.adicionarProprietario();
      component.resetar();
      expect(component.proprietariosAnteriores.length).toBe(0);
    });
 
    it('deve expor o grupo do proprietario via getProprietarioGroup', () => {
      component.adicionarProprietario();
      const grupo = component.getProprietarioGroup(0);
      expect(grupo.get('nome')).toBeTruthy();
      expect(grupo.get('documento')).toBeTruthy();
    });
  });
 
  // --- FormRecord ---
 
  describe('FormRecord: acessorios', () => {
    it('deve conter todas as chaves padrao de acessorios', () => {
      const keys = ['arCondicionado', 'vidros', 'airbag', 'abs', 'alarme'];
      keys.forEach((key) => {
        expect(component.acessorios.contains(key)).toBe(true);
      });
    });
 
    it('deve inicializar todos os acessorios como false', () => {
      Object.values(component.acessorios.controls).forEach((ctrl) => {
        expect(ctrl.value).toBe(false);
      });
    });
 
    it('deve adicionar um novo controle ao FormRecord', () => {
      component.acessorios.addControl(
        'novoAcessorio',
        new FormControl(false, { nonNullable: true })
      );
      expect(component.acessorios.contains('novoAcessorio')).toBe(true);
    });
 
    it('deve refletir o controle adicionado em acessoriosKeys', () => {
      component.acessorios.addControl(
        'tetoSolar',
        new FormControl(false, { nonNullable: true })
      );
      expect(component.acessoriosKeys).toContain('tetoSolar');
    });
 
    it('deve remover um controle do FormRecord', () => {
      component.acessorios.addControl(
        'acessorioTemporario',
        new FormControl(false, { nonNullable: true })
      );
      component.acessorios.removeControl('acessorioTemporario');
      expect(component.acessorios.contains('acessorioTemporario')).toBe(false);
    });
 
    it('deve atualizar o valor de um controle no FormRecord', () => {
      component.acessorios.get('airbag')?.setValue(true);
      expect(component.acessorios.get('airbag')?.value).toBe(true);
    });
 
    it('deve refletir a mudanca de valor no formulario pai', () => {
      component.acessorios.get('abs')?.setValue(true);
      expect(component.form.value.acessorios?.['abs']).toBe(true);
    });
  });
});