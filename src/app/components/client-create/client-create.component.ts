import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  standalone: true,
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDialogModule,
    MatNativeDateModule
  ]
})
export class ClientCreateComponent implements OnInit {
  clientForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private dialogRef: MatDialogRef<ClientCreateComponent>,
    private snackBar: MatSnackBar 
  ) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      sharedKey: ['', Validators.required],
      businessId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      const client: Client = this.clientForm.value;
      this.clientService.createClient(client).subscribe({
        next: () => {
          this.dialogRef.close(true); // Cierra el modal primero
          setTimeout(() => {
            this.snackBar.open('✅ Cliente creado satisfactoriamente', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
          }, 500); // Espera 500ms (medio segundo)
        },
        error: (err) => {
          console.error('Error creating client:', err);
          this.snackBar.open('❌ Error al crear el cliente', 'Cerrar', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      });
    }
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
}