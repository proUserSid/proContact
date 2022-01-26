import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from './core/models/contact';
import { ContactApiService } from './core/service/contact-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'proContact';

  contacts = [];
  subscriptions: Subscription[] = [];

  constructor(private contactApiService: ContactApiService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.subscriptions.push(
      this.contactApiService.contactList.subscribe((data) => {
        this.contacts = data;
      })
    );
  }
}
