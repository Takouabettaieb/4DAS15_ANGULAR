import { Component, input } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { Conference } from '../../models/conference';

@Component({
  selector: 'app-conference-details',
  imports: [DatePipe, UpperCasePipe],
  templateUrl: './conference-details.html',
  styleUrl: './conference-details.css',
})
export class ConferenceDetails {
  // Communication parent -> enfant : reçoit la conférence sélectionnée
  conference = input<Conference | null>(null);
}