import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ItemUsedDto} from '../../dto/dto';

@Component({
  selector: 'app-item-searchable-dropdown',
  standalone: false,

  templateUrl: './item-searchable-dropdown.component.html',
  styleUrl: './item-searchable-dropdown.component.css'
})
export class ItemSearchableDropdownComponent implements OnChanges, OnInit {

  @Input() items: ItemUsedDto[] = [];
  @Input() item?: ItemUsedDto;
  @Input() editMode: boolean = false;
  @Output() itemChange: EventEmitter<ItemUsedDto> = new EventEmitter<ItemUsedDto>();

  selectedItemControl: FormControl = new FormControl('');
  filteredItems: ItemUsedDto[] = [];
  copyOfId?: string;

  ngOnInit(): void {
    if(this.item) {
      this.selectedItemControl.setValue(this.item, {onlySelf: true, emitEvent: false})
      this.copyOfId = this.item.id!
    }
  }

  filterItems(event: KeyboardEvent) {
    const searchValue = (event.target as HTMLInputElement).value;
    if (!searchValue && searchValue.trim().length > 0) {
      this.filteredItems = this.items.filter(it => it.name.toLowerCase().includes(searchValue.toLowerCase()));
    } else {
      const searchLower = searchValue.toLowerCase();
      this.filteredItems = this.items.filter(item =>
        item.name.toLowerCase().includes(searchLower)
      );
    }
  }

  onSelectionChange(event: any) {
    const toEmit = {
      id: this.copyOfId,
      ...event.value,
    }
    this.itemChange.emit(toEmit);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["items"]) {
      this.filteredItems = changes["items"].currentValue;
    }
  }

  onClosed() {
    this.filteredItems = this.items;
  }
}
