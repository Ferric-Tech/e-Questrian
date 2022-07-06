import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export enum WarningType {
  EDIT_SAVE,
}

export enum WarningSubjectType {
  APPOINTMENT = 'appointment',
}

@Component({
  selector: 'app-warnings',
  templateUrl: './warnings.component.html',
  styleUrls: ['./warnings.component.scss'],
})
export class WarningsComponent implements OnInit {
  @Input() warning: WarningType | undefined;
  @Input() subject: WarningSubjectType | undefined;
  @Output() proceed: EventEmitter<void> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  header = '';
  body = '';
  proceedButtonText = '';
  cancelButtonText = '';

  ngOnInit(): void {
    this.setHeader();
    this.setBody();
    this.setButtons();
  }

  // Callbacks for call to actions
  onConfirmClick() {
    this.proceed.emit();
  }

  onCancelClick() {
    this.cancel.emit();
  }

  private setHeader() {
    switch (this.warning) {
      case WarningType.EDIT_SAVE: {
        this.header = 'Changes made';
      }
    }
  }

  private setBody() {
    switch (this.warning) {
      case WarningType.EDIT_SAVE: {
        this.body =
          'Changes have been made to the ' +
          this.subject +
          '. \
          Are you sure you want to save these changes?';
      }
    }
  }

  private setButtons() {
    switch (this.warning) {
      case WarningType.EDIT_SAVE: {
        this.proceedButtonText = 'Yes - save ' + this.subject;
        this.cancelButtonText = 'No - do not save';
      }
    }
  }
}
