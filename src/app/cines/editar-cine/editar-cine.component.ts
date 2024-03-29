import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CinesService } from 'src/app/cines/cines.service';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { cineCreacionDTO, cineDTO } from '../cine';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent {

  constructor(private router: Router, 
    private cinesServices: CinesService,
    private activatedRoute: ActivatedRoute) {}

  modelo: cineDTO;
  errores: string[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
    this.cinesServices.obtenerPorId(params.id)
    .subscribe(cine => {
      this.modelo = cine;
    }, () => this.router.navigate(['/cines']))
    });
  }

  guardarCambios(cine: cineCreacionDTO) {
    this.cinesServices.editar(this.modelo.id, cine)
    .subscribe(() => {
      this.router.navigate(['/cines']);
    }, error => this.errores = parsearErroresAPI(error))
  }
}
