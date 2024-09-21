import { Component } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';
import { Router } from '@angular/router';
import { SharedCoreService } from '../../services/sharedCore.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-receipt-details',
  templateUrl: './receipt-details.component.html',
  styleUrl: './receipt-details.component.css'
})
export class ReceiptDetailsComponent {
  receiptData: any = {};
  startDateOnly: any = '';
  userData: any = {};
  constructor(private _SubscriptionService: SubscriptionService, private _Router: Router, private _SharedService:SharedCoreService) {

    this._SharedService.getUserData().subscribe({
      next:(data)=>{
        this._SharedService.currentUserData = data.result;
        this.userData = data.result;
      }
    })

    this.receiptData = this._SubscriptionService.receptDetails;
    if (this.isReceiptDataEmpty(this.receiptData)) {
      this._Router.navigate(['/profile/receipts']);
    } else {
      // console.log(this.receiptData)
      const timestamp = this._SubscriptionService.receptDetails.startDate;
      this.startDateOnly = new Date(timestamp).toISOString().split('T')[0];
    }

    // console.log(this.receiptData)
  }
  isReceiptDataEmpty(data: any): boolean {
    return data === null || data === undefined || Object.keys(data).length === 0;
  }

  // ----------------------------------------------------------

  documentDefinition:any

  generatePdf() {
    this.documentDefinition = {
      content: [
       
        {
          text: [
            { text: 'MIDDLE EAST OPHTHALMIC CLINICS', bold: true, style: 'text', fontSize:30 ,color:'#02455A'},
            { text: '\nReciept', bold: true, style: 'text', fontSize:20},
          ],
          margin: [0, 10, 0, 30]
        },
        {
          columns: [
            {
              stack: [
                { text: 'Transaction No.', style: 'label' },
                { text: this.receiptData.paymentStatusResponse.data.invoiceId, bold: true, style: 'value' },
                { text: this.receiptData.paymentStatusResponse.data.invoiceTransactions[0].paymentGateway, style: 'text' }
              ]
            },
            {
              stack: [
                { text: 'Payment Date', alignment: 'left', style: 'label',margin:[125,0,0,0] },
                { text: this.separateDateTime(this.receiptData.paymentStatusResponse.data.invoiceTransactions[0].transactionDate).date + ' ' + this.separateDateTime(this.receiptData.paymentStatusResponse.data.invoiceTransactions[0].transactionDate).time, bold: true, alignment: 'right', style: 'value' }
              ]
            }
          ],
          margin: [0, 0, 0, 20]
        },
        {
          text: '',
          margin: [0, 0, 0, 20],
          canvas: [
            {
              type: 'line',
              x1: 0, y1: 0,
              x2: 520, y2: 0,
              lineWidth: 1
            }
          ]
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 80, 80, 100, 80],
            body: [
              [
                { text: 'DESCRIPTION', style: 'tableHeader', bold: true },
                { text: 'START DATE', style: 'tableHeader', alignment: 'center', bold: true },
                { text: 'END DATE', style: 'tableHeader', alignment: 'center', bold: true },
                { text: 'AMOUNT', style: 'tableHeader', alignment: 'center', bold: true },
                { text: 'CURRENCY', style: 'tableHeader', alignment: 'center', bold: true },
              ],
              [
                { text: this.receiptData.planDescription, style: 'text',blod:true},
                { text: this.separateDateTime(this.receiptData.startDate).date, alignment: 'center' },
                { text: this.separateDateTime(this.receiptData.endDate).date, alignment: 'center' },
                { text: this.receiptData.paymentStatusResponse.data.invoiceDisplayValue, alignment: 'center' },
                { text: this.receiptData.currencyDescription, alignment: 'center' },
              ]
            ]
          }
        },
        {
          text: '',
          style: '',
          margin: [30, 30, 0, 5]
        },
       
        {
          columns: [
            {
              stack: [
                {
                  columns: [
                    { text: '', bold: true, style: '', alignment: 'right'},
                    { text: '', bold: true, style: '', alignment: 'right'},
                    { text: 'Total :', bold: true, style: 'label', alignment: 'right', fontSize:15},
                    { text: this.receiptData.paymentStatusResponse.data.invoiceDisplayValue , bold: true, alignment: 'right', color: 'green',fontSize:18 }
                  ]
                }
              ]
            }
          ]
        },
        {
          text: 'Client',
          style: 'label',
          margin: [0, 0, 0, 5]
        },
        {
          text: [
            { text: this.userData.fullName + '\n', bold: true, style: 'value' },
            { text: this.userData.phoneNumber + '\n', style: 'text' },
            { text: this.userData.emailAddress, style: 'text' },
            { text: this.receiptData.paymentStatusResponse.data.invoiceTransactions[0].country + '\n', style: 'text' },
          ],
          margin: [0, 0, 0, 20]
        },
        {
          text: 'Details',
      style: 'label',
      margin: [0, 0, 0, 5]
        },
        {
          text: [
            { text: 'Payment Id: ' + this.receiptData.paymentStatusResponse.data.invoiceTransactions[0].paymentId +'\n', style: 'text' },
            { text: 'Transaction Id: ' + this.receiptData.paymentStatusResponse.data.invoiceTransactions[0].transactionId +'\n', style: 'text' },
            { text: 'Transaction Status: ' + this.receiptData.paymentStatusResponse.data.invoiceTransactions[0].transactionStatus +'\n', style: 'text' },
            { text: 'Card No: ' + this.receiptData.paymentStatusResponse.data.invoiceTransactions[0].cardNumber + '\n', style: 'text' }
          ],
          margin: [0, 0, 0, 20],
        },
      ],
      styles: {
        text: {
          fontSize: 12,
          color: '#333333'
        },
        label: {
          fontSize: 12,
          color: '#888888',
          bold: true
        },
        value: {
          fontSize: 14,
          color: '#333333'
        }
      }
    };

    pdfMake.createPdf(this.documentDefinition).open();
  }

  createTable(data: any[]) {
    return {
      table: {
        headerRows: 1,
        widths: ['*', '*','*'], // Adjust based on your needs
        body: [
          ['Name', 'Age','price'], // Table headers
          ...data.map(item => [item.name, item.age, item.price]) // Map data to rows
        ]
      }
    };
  }

  separateDateTime(timestamp:any) {
    const dateTime = new Date(timestamp);
    
    const date = dateTime.toISOString().split('T')[0];  // Extracts the date part
    const time = dateTime.toISOString().split('T')[1].split('.')[0];  // Extracts the time part

    return { date, time };
}

}
