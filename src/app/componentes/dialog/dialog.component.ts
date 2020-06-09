import { Component, OnInit, Host, Input, Inject } from "@angular/core";
import { PersonaService } from "src/app/servicio/persona.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Persona } from "src/app/modelos/persona";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.css"],
})
export class DialogComponent implements OnInit {
  formularioPersona: FormGroup;

  id: number;
  // bolean q utilizo en el template para mostrar distintos botones
  edicion: boolean;

  constructor(
    private servicio: PersonaService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public persona: Persona
  ) {}

  ngOnInit() {
    console.log("Iniciando onit");
    console.log(this.persona);
    this.creacionFormulario();

    if (this.persona.id !== 0) {
      this.cargarDatosFormulario();
    }
  }

  creacionFormulario() {
    // creo el formulario y solo le damos la validacion de que sea requerido
    this.formularioPersona = this.fb.group({
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      edad: [
        ,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]+$"),
        ]),
      ],
      dni: [
        ,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]+$"),
        ]),
      ],
    });
    console.log("creacion de formulario ejecutado");
  }

  cargarDatosFormulario() {
    // seteo a true la edicion para mostrar el boton de editar
    this.edicion = true;
    // al formulario le seto los valores que vinene por parametro
    this.formularioPersona.setValue({
      nombre: this.persona.nombre,
      apellido: this.persona.apellido,
      edad: this.persona.edad,
      dni: this.persona.dni,
    });
    // fuera de el le seteo el id para que no este dentro del formulario pero si poder manipularla y realizar la
    // edicion de la persona en update()
    this.id = this.persona.id;
    console.log("cargar datos  de formulario ejecutado");
  }

  agregar() {
    //  hago un post con los valores del formulario
    this.servicio.post(this.formularioPersona.value).subscribe(
      (data) => {
        // reseteo el formulario para que el usuario pueda seguira agregando personas
        this.formularioPersona.reset();

        this.openSnackBar(
          `Registro ${data.id} llamado ${data.nombre}  ${data.apellido}. Agregado correctamente`,
          "Aceptar"
        );

        this.closeModal();

        // controlo el error del servicio y lo muestro en consola
      },
      (err) => {
        console.log("ocurrio un error verifique que todo este bien en " + err);
      }
    );

    console.log("Agregar ejecutado");
  }

  update() {
    // utilizo el metodo put del servicio enviandole el valor actual del formulario
    // ya que esta llenado por el metodo creacionFormularioEditar() con los datos de la persona a editar
    this.servicio.put(this.id, this.formularioPersona.value).subscribe(
      (data) => {
        // cerramos el modal y lo dejo en modo de agregacion
        this.openSnackBar(
          `Registro ${data.id} llamado ${data.nombre}  ${data.apellido} editado correctamente`,
          "Aceptar"
        );
        this.closeModal();
        // controlo el error del servicio y lo muestro en consola
      },
      (err) => {
        console.log("ocurrio un error verifique que todo este bien en " + err);
      }
    );

    console.log("Update ejecutado");
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

  closeModal() {
    this.formularioPersona.reset();

    this.edicion = false;
    this.dialog.close();
  }
}
