import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-date-picker-input',
  standalone: false,

  templateUrl: './date-picker-input.component.html',
  styleUrl: './date-picker-input.component.css'
})
export class DatePickerInputComponent {

  @Input() selectedDate!: Date
  @Output() selectedDateChange: EventEmitter<Date> = new EventEmitter<Date>()

}
