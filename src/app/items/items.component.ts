import {Component} from '@angular/core';
import {DataService} from '../service/data.service';
import {Observable} from 'rxjs';
import {ItemUsedDto} from '../dto/dto';
import {AddItemDialogComponent} from './add-item-dialog/add-item-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-items',
  standalone: false,

  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {

  items: Observable<ItemUsedDto[]>;

  constructor(private dataService: DataService,
              private dialog: MatDialog
  ) {
    this.items = this.dataService.items.asObservable();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      width: '80vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.updateItems()
      }
    });
  }

}
