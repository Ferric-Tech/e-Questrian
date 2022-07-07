import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export enum WarningType {
  EDIT_SAVE,
  EDIT_CANCEL,
  TIME_EXCESSIVE,
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
      case WarningType.EDIT_SAVE || WarningType.EDIT_CANCEL: {
        this.header = 'Changes made';
        return;
      }
      case WarningType.TIME_EXCESSIVE: {
        this.header = 'Long meeting duration ';
        return;
      }
    }
  }

  private setBody() {
    switch (this.warning) {
      case WarningType.EDIT_SAVE: {
        this.body =
          'Changes have been made to the ' +
          this.subject +
          '. Are you sure you want to save these changes?';
        return;
      }
      case WarningType.EDIT_CANCEL: {
        this.body =
          'Changes have been made to the ' +
          this.subject +
          '. Are you sure you want to cancel these changes?';
        return;
      }
      case WarningType.TIME_EXCESSIVE: {
        this.body =
          'We notices the duration for this ' +
          this.subject +
          ' is longer than 2 hours. Are you sure this is correct?';
        return;
      }
    }
  }

  private setButtons() {
    switch (this.warning) {
      case WarningType.EDIT_SAVE: {
        this.proceedButtonText = 'Yes - save ' + this.subject;
        this.cancelButtonText = 'No - do not save';
        return;
      }
      case WarningType.EDIT_CANCEL: {
        this.proceedButtonText = 'Yes - cancel changes ';
        this.cancelButtonText = 'No - keep changes';
        return;
      }
      case WarningType.TIME_EXCESSIVE: {
        this.proceedButtonText = 'Yes - that is correct ';
        this.cancelButtonText = 'No - let me change that';
        return;
      }
    }
  }
}
