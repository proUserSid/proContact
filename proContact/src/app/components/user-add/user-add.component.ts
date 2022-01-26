import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContactApiService } from 'src/app/core/service/contact-api.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent implements OnInit {
  contact: any = {
    name: '',
    job: '',
  };

  /* Alert List */
  alertList: any[] = [];

  constructor(private contactApiService: ContactApiService) {}

  ngOnInit(): void {}

  onAdd(invalid: any) {
    if (invalid) return;
    this.contact.name = this.contact.name.trim();
    this.contact.job = this.contact.job.trim();
    console.log('sdfsfsf');

    this.contactApiService.setContact(this.contact).subscribe(
      (success: any) => {
        console.log('Success Save', success);
        this.alertList.length = 0;
        this.alertList.push({
          type: 'success',
          msg: 'Job added auccessfully',
        });
      },
      (error: any) => {
        console.log('Error Save', error);
        this.alertList.push({
          type: 'danger',
          msg: 'Error while adding job',
        });
      }
    );
  }

  onClosedAlert(dismissedAlert: any): void {
    this.alertList = this.alertList.filter((alert) => alert !== dismissedAlert);
  }
}
