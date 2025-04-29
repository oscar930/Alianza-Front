import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ClientCreateComponent } from '../client-create/client-create.component';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  standalone: true,
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    ClientCreateComponent
  ]
})
export class ClientListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['sharedKey', 'businessId', 'email', 'phone', 'startDate', 'endDate'];
  dataSource = new MatTableDataSource<Client>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private clientService: ClientService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadClients();
    // Solo filtra por sharedKey
  this.dataSource.filterPredicate = (data: Client, filter: string): boolean => {
    return data.sharedKey.toLowerCase().includes(filter);
  };
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(clients => {
      this.dataSource.data = clients;
    });
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(ClientCreateComponent, {
      width: '600px',   // 👈 tamaño deseado
      maxHeight: '90vh', // opcional para evitar overflow vertical
      autoFocus: false   // opcional si no quieres que el foco esté en el primer input
    });
  
    dialogRef.afterClosed().subscribe((created: boolean) => {
      if (created) {
        this.loadClients(); // Recarga la tabla
      }
    });
  }



  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: Client, filter: string) =>
      data.sharedKey.toLowerCase().includes(filter);
  }

  onExport(): void {
    const clients = this.dataSource.data;
    if (!clients.length) return;
  
    // Generar cabecera CSV
    const headers = Object.keys(clients[0]);
    const csvRows = [headers.join(',')];
  
    // Agregar cada fila
    for (const client of clients) {
      const values = headers.map(header => {
        const value = client[header as keyof Client];
        return `"${(value ?? '').toString().replace(/"/g, '""')}"`;
      });
      csvRows.push(values.join(','));
    }
  
    // Crear archivo CSV
    const csvString = csvRows.join('\r\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
  
    // Crear enlace de descarga
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clients.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}