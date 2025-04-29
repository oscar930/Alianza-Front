import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientListComponent } from './client-list.component';
import { ClientService } from '../../services/client.service';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from '../../shared/material/material.module';

describe('ClientListComponent', () => {
  let component: ClientListComponent;
  let fixture: ComponentFixture<ClientListComponent>;
  let clientService: ClientService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientListComponent],
      imports: [MatTableModule, HttpClientTestingModule, MaterialModule],
      providers: [ClientService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientListComponent);
    component = fixture.componentInstance;
    clientService = TestBed.inject(ClientService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load clients on init', () => {
    const clientData = [
      { sharedKey: '1', businessId: 'B001', email: 'client1@mail.com', phone: '123456789', startDate: '2022-01-01', endDate: '2023-01-01' },
      { sharedKey: '2', businessId: 'B002', email: 'client2@mail.com', phone: '987654321', startDate: '2022-02-01', endDate: '2023-02-01' }
    ];

    spyOn(clientService, 'getClients').and.returnValue(of(clientData));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.dataSource.data.length).toBe(2);
  });
});