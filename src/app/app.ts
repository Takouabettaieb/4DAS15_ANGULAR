import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { ConferenceList } from './components/conference-list/conference-list';
import { ConferenceDetails } from './components/conference-details/conference-details';
import { Conference } from './models/conference';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Navbar, Footer,ConferenceList, ConferenceDetails],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
   selectedConference = signal<Conference | null>(null);
}
