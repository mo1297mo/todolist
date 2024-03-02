import { Component } from '@angular/core';
import { ThemeService } from './features/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(public themeService: ThemeService) {}
}
