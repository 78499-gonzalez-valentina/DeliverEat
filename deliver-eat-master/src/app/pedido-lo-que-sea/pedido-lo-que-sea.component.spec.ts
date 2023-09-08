import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoLoQueSeaComponent } from './pedido-lo-que-sea.component';

describe('PedidoLoQueSeaComponent', () => {
  let component: PedidoLoQueSeaComponent;
  let fixture: ComponentFixture<PedidoLoQueSeaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoLoQueSeaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoLoQueSeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
