import { Component, OnInit } from '@angular/core';
import { PersonaService } from './../../servicio/persona.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private service: PersonaService) { }

  ngOnInit(): void {
  }

}
