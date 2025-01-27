import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {ItemUsedDto} from '../../dto/dto';

@Component({
  selector: 'app-items-table',
  standalone: false,

  templateUrl: './items-table.component.html',
  styleUrl: './items-table.component.css'
})
export class ItemsTableComponent implements OnInit {

  @Input() items!: Observable<ItemUsedDto[]> | ItemUsedDto[];
  @Input() allowDeletion: boolean = false;
  @Input() allowEdit: boolean = false;
  @Input() allowMove: boolean = false;
  @Output() itemToDeleteEmitter = new EventEmitter<ItemUsedDto>();
  @Output() itemToEditEmitter = new EventEmitter<ItemUsedDto>();
  @Output() itemToMoveEmitter = new EventEmitter<ItemUsedDto>();
  displayedColumns: string[] = ['Name', 'Grams', 'Calories', 'Protein', 'Fat', 'Carbohydrates'];

  ngOnInit(): void {
    if (this.allowDeletion) {
      this.displayedColumns.push('delete');
    }
    if (this.allowEdit) {
      this.displayedColumns.push('edit');
    }
    if (this.allowMove) {
      this.displayedColumns.push('move');
    }
  }

  emitDelete(item: ItemUsedDto) {
    this.itemToDeleteEmitter.emit(item);
  }

  emitEdit(item: ItemUsedDto) {
    this.itemToEditEmitter.emit(item);
  }

  emitMove(item: ItemUsedDto) {
    this.itemToMoveEmitter.emit(item);
  }
}
