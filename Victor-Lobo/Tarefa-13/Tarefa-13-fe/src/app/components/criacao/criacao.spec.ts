import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Criacao } from './criacao';

describe('Criacao', () => {
  let component: Criacao;
  let fixture: ComponentFixture<Criacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Criacao],
    }).compileComponents();

    fixture = TestBed.createComponent(Criacao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
