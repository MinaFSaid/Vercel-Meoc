import { Component } from '@angular/core';
import { InitDataService } from '../../Services/init-data.service';


@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css',

})
export class PublicLayoutComponent {

  constructor(private _InitDataService:InitDataService,) {this._InitDataService.initialize();}

}
