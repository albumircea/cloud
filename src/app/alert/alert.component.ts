import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit, OnDestroy {

  private subscription: Subscription | undefined;
  message: any;
  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.subscription = this.alertService.getAlert().subscribe(message => {
      switch (message && message.type){
        case 'succes':
          message.cssClass = 'alert alert-succes';
          break;
        case 'error':
          message.cssClass = 'alert alert-danger';
          break;
      }
      this.message = message;
    });
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.subscription.unsubscribe();
  }

}
