import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientCreateComponent } from './client-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../../services/client.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClientCreateComponent', () => {
  let component: ClientCreateComponent;
  let fixture: ComponentFixture<ClientCreateComponent>;
  let clientService: ClientService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientCreateComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        ClientService,
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCreateComponent);
    component = fixture.componentInstance;
    clientService = TestBed.inject(ClientService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createClient on submit', () => {
    spyOn(clientService, 'createClient').and.callThrough();

    component.clientForm.setValue({
      sharedKey: '1',
      businessId: 'B001',
      email: 'client1@mail.com',
      phone: '123456789',
      startDate: '2022-01-01',
      endDate: '2023-01-01'
    });

    component.onSubmit();

    expect(clientService.createClient).toHaveBeenCalled();
  });
});