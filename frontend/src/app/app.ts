import { Component, signal } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard';


@Component({
  selector: 'app-root',
  imports: [HttpClientModule, DashboardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
