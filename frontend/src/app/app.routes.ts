import { LoginComponent } from './components/auth/login/login.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EventListComponent } from './components/events/event-list/event-list.component';
import { EventFormComponent } from './components/events/event-form/event-form.component';
import { ParticipantListComponent } from './components/participants/participant-list/participant-list.component';
import { ParticipantFormComponent } from './components/participants/participant-form/participant-form.component';
import { NotificationListComponent } from './components/notifications/notification-list/notification-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'events', component: EventListComponent },
    { path: 'events/new', component: EventFormComponent },
    { path: 'events/:id', component: EventFormComponent },
    { path: 'participants', component: ParticipantListComponent },
    { path: 'participants/new', component: ParticipantFormComponent }, // Used for Register
    { path: 'participants/:id', component: ParticipantFormComponent },
    { path: 'notifications', component: NotificationListComponent },
    { path: '**', redirectTo: 'login' }
];
