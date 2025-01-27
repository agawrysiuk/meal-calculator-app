import {Component} from '@angular/core';
import {DataService} from './service/data.service';
import {BasePropertiesPer100HundredGramDto} from './dto/dto';
import {formatDate} from './common/helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {

  today?: BasePropertiesPer100HundredGramDto;
  todaysDate: string = formatDate(new Date())

  constructor(private dataService: DataService) {
    this.dataService.today.asObservable().subscribe(next => {
      this.today = next;
    })
  }
}
