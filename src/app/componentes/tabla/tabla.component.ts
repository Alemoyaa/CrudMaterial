import { Component, OnInit, ViewChild, Output } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Persona } from "src/app/modelos/persona";

import { PersonaService } from "src/app/servicio/persona.service";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: "app-tabla",
  templateUrl: "./tabla.component.html",
  styleUrls: ["./tabla.component.css"],
})
export class TablaComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = [
    "id",
    "nombre",
    "apellido",
    "edad",
    "dni",
    "acciones",
  ];

  dataSource: MatTableDataSource<Persona>;

  personaParametro: Persona = {
    id: null,
    nombre: "",
    apellido: "",
    edad: null,
    dni: null,
  };

  // arreglo de personas vacio por defecto
  personas: Persona[] = [];

  constructor(
    private servicio: PersonaService,

    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // cuando se realice alguna peticion del service se refrescara el gett all
    this.servicio.refresh.subscribe(() => {
      this.getAll();
    });
    // se inicia un getAll por defecto para llenar la tabla
    this.getAll();
  }

  getAll() {
    // utilizo el metodo getAll del servicio, como es un observable me puedo suscribir a el y manipular su data
    this.servicio.getAll().subscribe(
      (data) => {
        // me aseguro que el arreglo este vacio, para cuando lo llamo de otros metodos no me agregue por
        // duplicado las personas
        this.personas.length = 0;
        data.forEach((res) => {
          // hago un for each de la data
          // y hago un push a personas
          this.personas.push(res);
        });
        this.dataSource = new MatTableDataSource<Persona>(this.personas);
        this.dataSource.paginator = this.paginator;
        // aprovecho que es un observable controlo el error del servicio y lo muestro en consola
      },
      (err) => {
        console.log("ocurrio un error verifique que todo este bien en " + err);
      }
    );
  }

  delete(id: number) {
    // pido confirmacion de la eliminacion
    const opcion = confirm("¿Esta seguro que desea eliminar?");
    if (opcion) {
      // utilizo el metodo delete del servicio y le envio el id por parametro
      this.servicio.delete(id).subscribe(
        (data) => {
          // le envio un mensaje al usuario
          this.openSnackBar("Registro eliminado", "Aceptar");
          // controlo el error del servicio y lo muestro en consola
        },
        (err) => {
          console.log(
            "ocurrio un error verifique que todo este bien en " + err
          );
        }
      );
    } else {
      this.openSnackBar("Registro no eliminado", "Aceptar");
    }
  }

  openModal(persona: Persona) {
    this.personaParametro = persona;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "250px",
      data: {
        id: this.personaParametro.id,
        nombre: this.personaParametro.nombre,
        apellido: this.personaParametro.apellido,
        edad: this.personaParametro.edad,
        dni: this.personaParametro.dni,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.personaParametro = {
        id: null,
        nombre: "",
        apellido: "",
        edad: null,
        dni: null,
      };
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
