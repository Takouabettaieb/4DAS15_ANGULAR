import { Component, computed, output, signal } from '@angular/core';
import { DatePipe, NgClass, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Conference } from '../../models/conference';

@Component({
  selector: 'app-conference-list',
  imports: [FormsModule, NgClass, DatePipe, UpperCasePipe],
  templateUrl: './conference-list.html',
  styleUrl: './conference-list.css',
})
export class ConferenceList {
  // Communication enfant -> parent : envoie la conférence sélectionnée
  conferenceSelected = output<Conference>();

  searchTerm = signal('');
  selected = signal<Conference | null>(null);

  conferences = signal<Conference[]>([
    {
      id: 1,
      title: 'Angular 21 Conference',
      description: 'Les nouveautés d’Angular 21 : signals, zoneless et contrôle de flux natif.',
      date: new Date(2027, 10, 15),
      place: 'Tunis',
      maxParticipants: 100,
      nbParticipants: 75,
    },
    {
      id: 2,
      title: 'Signals Workshop',
      description: 'Atelier pratique sur la gestion d’état réactive avec les signals.',
      date: new Date(2027, 10, 30),
      place: 'Ariana',
      maxParticipants: 30,
      nbParticipants: 24,
    },
    {
      id: 3,
      title: 'Web Conference',
      description: 'Panorama des technologies web modernes.',
      date: new Date(2027, 10, 20),
      place: 'Sousse',
      maxParticipants: 50,
      nbParticipants: 50,
    },
    {
      // Conférence passée : elle ne doit PAS apparaître (filtre « à venir »)
      id: 4,
      title: 'TypeScript Day',
      description: 'Édition 2025, déjà terminée.',
      date: new Date(2025, 4, 10),
      place: 'Monastir',
      maxParticipants: 80,
      nbParticipants: 80,
    },
  ]);

  // Conférences à venir + filtre par titre (se recalcule automatiquement)
  filteredConferences = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.conferences().filter(
      (c) => c.date >= today && c.title.toLowerCase().includes(term)
    );
  });

  remainingPlaces(conf: Conference): number {
    return conf.maxParticipants - conf.nbParticipants;
  }

  // 3 états du bouton : vert / orange / rouge
  buttonClass(conf: Conference): string {
    const remaining = this.remainingPlaces(conf);
    if (remaining <= 0) return 'btn-full';
    if (remaining <= 10) return 'btn-low';
    return 'btn-available';
  }

  select(conf: Conference): void {
    this.selected.set(conf);
    this.conferenceSelected.emit(conf);
  }

  register(conf: Conference, event: Event): void {
    event.stopPropagation(); // évite de déclencher aussi la sélection de la carte
    if (this.remainingPlaces(conf) <= 0) return;

    this.conferences.update((list) =>
      list.map((c) =>
        c.id === conf.id ? { ...c, nbParticipants: c.nbParticipants + 1 } : c
      )
    );

    // Garde la sélection à jour avec les nouvelles données
    if (this.selected()?.id === conf.id) {
      this.selected.set(this.conferences().find((c) => c.id === conf.id) ?? null);
    }
  }
}