import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EncryptDecryptService } from '../../shared/services/encrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class CountrydataService {

  private selectedDropdownSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this._EncryptDecryptService.decryptUsingAES256(sessionStorage.getItem('CountryId')));

  constructor(private _EncryptDecryptService:EncryptDecryptService) { }
  
  setSelectedDropdown(value: string): void {
    this.selectedDropdownSubject.next(value);
  }

  getSelectedDropdown(): Observable<string> {
    return this.selectedDropdownSubject.asObservable();
  }
}
