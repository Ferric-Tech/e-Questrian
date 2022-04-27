import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClientDetail } from 'src/app/interfaces/clients.interface';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss'],
})
export class ClientDetailsComponent implements OnInit {
  @Input() currentClient = {} as ClientDetail;
  @Output() canceled = new EventEmitter<void>();
  @Output() newClient = new EventEmitter<ClientDetail>();
  @Output() editedClient = new EventEmitter<ClientDetail>();
  @Output() removeClient = new EventEmitter<void>();

  isNewClient: boolean | undefined;
  isRemoveClient = false;
  isDisplayNameEditable = false;
  clientForm = new FormGroup({
    displayName: new FormControl('New Client'),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    telephoneNumber: new FormControl(''),
  });
  times: string[] = [];
  clients: string[] = [];
  displayTime = '';

  ngOnInit(): void {
    this.isNewClient = Object.keys(this.currentClient).length === 0;
    this.setForm();
    this.setClients();
  }

  // Main call to actions callbacks
  onSubmitClick() {
    this.isRemoveClient
      ? this.removeClient.emit()
      : this.isNewClient
      ? this.newClient.emit(this.clientForm.value as ClientDetail)
      : this.editedClient.emit(this.clientForm.value as ClientDetail);
  }

  onRemoveAppointmentClick() {
    this.isRemoveClient = true;
    this.onSubmitClick();
  }

  onCancelClick() {
    this.canceled.emit();
  }

  updateDisplayName() {
    if (
      this.clientForm.controls['firstName'].value != '' ||
      this.clientForm.controls['lastName'].value != ''
    ) {
      this.clientForm.controls['displayName'].setValue(
        this.clientForm.controls['firstName'].value +
          ' ' +
          this.clientForm.controls['lastName'].value
      );
      this.isDisplayNameEditable = true;
      return;
    }
    this.clientForm.controls['displayName'].setValue('New client');
    this.isDisplayNameEditable = false;
  }

  private setForm() {
    if (this.isNewClient) {
      return;
    }
    this.clientForm = new FormGroup({
      displayName: new FormControl(this.currentClient.displayName),
      firstName: new FormControl(this.currentClient.firstName),
      lastName: new FormControl(this.currentClient.lastName),
      email: new FormControl(this.currentClient.email),
      telephoneNumber: new FormControl(this.currentClient.telephoneNumber),
    });
    if (this.currentClient.displayName != '') {
      this.isDisplayNameEditable = true;
    }
  }

  private setClients() {
    let clientList = localStorage.getItem('clients');
    this.clients = JSON.parse(clientList || '[]');
  }
}
