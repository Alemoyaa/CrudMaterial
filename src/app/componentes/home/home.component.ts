import { MatPaginator } from '@angular/material/paginator';
import { Persona } from './../../modelos/persona';
import { PersonaService } from './../../servicio/persona.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  //El primer valor es el selector, lo que queremos obtener del HTML/Templete
  //'paginator' es el nombre de una variable en la cual se guarda lo que optenemos

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'dni', 'acciones'];

  dataSource: MatTableDataSource<Persona>;
  //Iniciamos el data source con la estructura del ObjetoMatTable con el tipo de dato que va a mostrar


  // formulario inicial
  formularioPersona: FormGroup;
  // id que utilizare para el update
  id: number;
  // arreglo de personas vacio por defecto
  personas: Persona[] = [];
  // bolean q utilizo en el template para mostrar distintos botones
  edicion = false;
  // boolean para saber si el modal esta cerrado y asi cambiar los valores dentro de el
  modalCerrado = false;

  constructor(private servicio: PersonaService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    // cuando se realice alguna peticion del service se refrescara el gett all
    this.servicio.refresh.subscribe(() => { this.getAll() });
    // se inicia un getAll por defecto para llenar la tabla
    this.getAll();
    this.creacionFormulario();

    console.log(this.personas)
  }

  creacionFormulario() {
    // creo el formulario y solo le damos la validacion de que sea requerido
    this.formularioPersona = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: [0, Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])]
    });
  }

  cargarDatosFormulario(persona: Persona) {
    // seteo a true la edicion para mostrar el boton de editar
    this.edicion = true;
    // al formulario le seto los valores que vinene por parametro
    this.formularioPersona.setValue({
      nombre: persona.nombre,
      apellido: persona.apellido,
      dni: persona.dni,
    });
    // fuera de el le seteo el id para que no este dentro del formulario pero si poder manipularla y realizar la
    // edicion de la persona en update()
    this.id = persona.id;
  }

  getAll() {
    // utilizo el metodo getAll del servicio, como es un observable me puedo suscribir a el y manipular su data
    this.servicio.getAll().subscribe((data) => {
      // me aseguro que el arreglo este vacio, para cuando lo llamo de otros metodos no me agregue por
      // duplicado las personas
      this.personas.length = 0;
      data.forEach((res) => {
        // hago un for each de la data
        // y hago un push a personas
        this.personas.push(res);
      });

      this.dataSource = new MatTableDataSource<Persona>(this.personas);//Le asiganmos los datos a la fuente de datos(dataSource) para que la tabla los represente

      this.dataSource.paginator = this.paginator; //Como el matTable es una fuente de datos de tipo tabla, le pasomos el MatPaginator como un dato, lo cual escuchara automaticamente los cambios de pagina realizados por el usuario y enviara los datos paginados correctos a la tabla

    }, (err) => {
      console.log('ocurrio un error verifique que todo este bien en ' + err);
    });
  }

  delete(id: number) {
    // pido confirmacion de la eliminacion
    const opcion = confirm('¿Esta seguro que desea eliminar?');
    if (opcion) {
      // utilizo el metodo delete del servicio y le envio el id por parametro
      this.servicio.delete(id).subscribe((data) => {
        // le envio un mensaje al usuario
        this.formularioPersona.reset();
        this.openSnackBar("Registro eliminado", "Aceptar");
        // controlo el error del servicio y lo muestro en consola
      }, (err) => {
        console.log('ocurrio un error verifique que todo este bien en ' + err);
      });
    } else {
      this.openSnackBar("Registro no eliminado", "Aceptar");
    }
  }

  agregar() {
    //  hago un post con los valores del formulario
    this.servicio.post(this.formularioPersona.value).subscribe(
      (data) => {
        //  los valores los agrego al array de personas
        this.personas.push(data);

        // reseteo el formulario para que el usuario pueda seguira agregando personas
        this.formularioPersona.reset();

        this.openSnackBar(`Registro ${data.id} llamado ${data.nombre}  ${data.apellido}. Agregado correctamente`, "Aceptar");

        this.closeModal();

        // controlo el error del servicio y lo muestro en consola
      }, (err) => { console.log('ocurrio un error verifique que todo este bien en ' + err); }
    );
  }

  update() {
    // utilizo el metodo put del servicio enviandole el valor actual del formulario
    // ya que esta llenado por el metodo creacionFormularioEditar() con los datos de la persona a editar
    this.servicio.put(this.id, this.formularioPersona.value).subscribe(
      (data) => {
        // seteo nuevamente el vlaor de es editar a falso para que se vuelva a mostrar el boton AGREGAR
        this.edicion = false;
        // cerramos el modal y lo dejo en modo de agregacion
        this.openSnackBar(`Registro ${data.id} llamado ${data.nombre}  ${data.apellido} editado correctamente`, "Aceptar");
        this.closeModal();
        // controlo el error del servicio y lo muestro en consola
      }, (err) => {
        console.log('ocurrio un error verifique que todo este bien en ' + err);
      });
  }

  openModal(template: TemplateRef<any>) {
   const dialogRef = this.dialog.open(template,{
    width: '250px',
   });
  }


  closeModal(): void {
   const dialogRef = this.dialog.closeAll();
   this.formularioPersona.reset();
   this.edicion = false;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
