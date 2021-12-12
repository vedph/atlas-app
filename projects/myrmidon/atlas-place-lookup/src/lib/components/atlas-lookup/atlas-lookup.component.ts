import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuickSearchResult } from '@myrmidon/atlas-place-picker';
import { AtlasRefLookupService } from '../../services/atlas-ref-lookup.service';

@Component({
  selector: 'atlas-lookup',
  templateUrl: './atlas-lookup.component.html',
  styleUrls: ['./atlas-lookup.component.css'],
})
export class AtlasLookupComponent implements OnInit {
  @Input()
  public item: QuickSearchResult | undefined;

  @Output()
  public itemChange: EventEmitter<QuickSearchResult>;

  constructor(public service: AtlasRefLookupService) {
    this.itemChange = new EventEmitter<QuickSearchResult>();
  }

  ngOnInit(): void {}

  public onItemChange(item: QuickSearchResult): void {
    this.item = item;
    this.itemChange.emit(item);
  }

  public onMoreRequest(): void {
    // TODO
  }
}
