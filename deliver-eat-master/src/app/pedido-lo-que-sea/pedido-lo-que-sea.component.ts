import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConditionalValidator } from "../shared/validators/conditional.validator";
import { DateTimeValidator } from "../shared/validators/date.time.validator";
import { Ciudad, ciudades } from "./shared/models/ciudad.model";
import * as moment from "moment/moment";
import Swal from 'sweetalert2';
import { FormControl, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-pedido-lo-que-sea',
  templateUrl: './pedido-lo-que-sea.component.html',
  styleUrls: ['./pedido-lo-que-sea.component.css']
  
})

export class PedidoLoQueSeaComponent implements OnInit {
  titulo: string = 'Realizar un pedido de lo que sea';

  urlImagen: string;

  formPedido: FormGroup;

  submitted: boolean = false;


  totalAPagar: number;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    // Inicializa el formulario.
    this.buildForm();

    // Actualiza valores y validez de los campos fecha y hora de entrega ante un cambio en el momento de entrega.
    this.form['momentoEntrega'].valueChanges
      .subscribe(() => {
        this.form['fechaEntrega'].updateValueAndValidity();
        this.form['horaEntrega'].updateValueAndValidity();
      });

    // Actualiza valores y validez de los campos referidos a la forma de pago ante un cambio en esta.
    this.form['formaPago'].valueChanges
      .subscribe(() => {
        this.form['montoAAbonar'].updateValueAndValidity();
        this.form['nroTarjeta'].updateValueAndValidity();
        this.form['titularTarjeta'].updateValueAndValidity();
        this.form['fechaVencimientoTarjeta'].updateValueAndValidity();
        this.form['codigoSeguridadTarjeta'].updateValueAndValidity();
      });
  }

  get form()  {
    return this.formPedido.controls;
  }

  get momentoEntrega(): string {
    return this.form['momentoEntrega'].value;
  }

  get formaPago(): string {
    return this.form['formaPago'].value;
  }


  get ciudadComercio(): number {
    return this.form['ciudadComercio'].value;
  }

  get ciudadDomicilio(): number {
    return this.form['ciudadDomicilio'].value;
  }

  

  /**
   * Construye el formulario inicial, con todos sus campos y validaciones requeridas.
   * @private
   */
  private buildForm(): void {
    this.formPedido = this.formBuilder.group({
      descripcionPedido: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(240)]],
      precioPedido: [null, [Validators.required,Validators.pattern("[0-9]*"),Validators.maxLength(240)]],
      imagen: [null],
      calleNombreComercio: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(240)]],
      ciudadComercio: [null, [Validators.required, Validators.pattern(/^(Cordoba|Carlos Paz)$/)]],
      referenciaComercio: [null, [Validators.minLength(3), Validators.maxLength(240)]],
      calleNombreDomicilio: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(240)]],
      ciudadDomicilio: [null ,[Validators.required, Validators.pattern(/^(Cordoba|Carlos Paz)$/)]],
      referenciaDomicilio: [null, [Validators.minLength(3), Validators.maxLength(240)]],
      momentoEntrega: [null, Validators.required],
      fechaEntrega: [null, [
        DateTimeValidator.moreThanToday,
        ConditionalValidator.conditionalValidator(() => this.momentoEntrega === 'programar', Validators.required)]],
      horaEntrega: [null, ConditionalValidator.conditionalValidator(() => this.momentoEntrega === 'programar', Validators.required)],
      formaPago: [null, Validators.required],
      montoAAbonar: [null, [
        Validators.max(999999),
        ConditionalValidator.conditionalValidator(() => this.formaPago === 'efectivo', Validators.required)]],
      nroTarjeta: [null, [
        Validators.pattern("4[0-9]{15}"),
        ConditionalValidator.conditionalValidator(() => this.formaPago === 'tarjeta', Validators.required)]],
      titularTarjeta: [null, [
        Validators.minLength(4),
        Validators.maxLength(50),
        ConditionalValidator.conditionalValidator(() => this.formaPago === 'tarjeta', Validators.required)]],
      fechaVencimientoTarjeta: [null, [
        Validators.pattern('(1[012][-/]2022)|((0[1-9]|1[012])[-/]20(2[3-9]{1}|[3-9]{2}))'),
        ConditionalValidator.conditionalValidator(() => this.formaPago === 'tarjeta', Validators.required)]],
      codigoSeguridadTarjeta: [ null, [
        Validators.pattern('[0-9]{3}'),
        ConditionalValidator.conditionalValidator(() => this.formaPago === 'tarjeta', Validators.required)]]
    });
  }
  

  /**
   * Realiza validaciones de tipo y tamaño ante una carga de imagen por el usuario. Si se acepta,
   * se muestra la imagen por pantalla. Si no, se alerta el motivo de su rechazo.
   * @param evento carga una imagen seleccionada por el usuario de su dispositivo.
   */
  onImagenChange(evento: any): void {
    this.formPedido.patchValue({ imagen: null });
    this.urlImagen = '';

    const extensionesPermitidas = ['jpg'];
    const tamanoMaximo = 5_000_000; // Tamaño máximo de 5MB.

    if (evento.target.files.length === 0) return;

    const imagenASubir = evento.target.files[0];

    const tamanoImagen = imagenASubir.size;
    const nombreImagen = imagenASubir.name;
    const extension = nombreImagen.split(".").pop();

    // Pregunta si la imagen no tiene el formato requerido.
    if(!extensionesPermitidas.includes(extension))
      alert("El tipo de imagen no es el permitido. Por favor, suba una imagen con extensión jpg");
    // Pregunta si la imagen supera el tamaño requerido.
    else if (tamanoImagen > tamanoMaximo)
      alert("El tamaño de la imagen es demasiado grande. Por favor, suba un archivo menor a 5MB.");
    // Pasa las validaciones y muestra la imagen.
    else {
      this.formPedido.patchValue({ imagen: imagenASubir });
      // Vista previa de imagen.
      const reader: FileReader = new FileReader();
      reader.onload = () => this.urlImagen = reader.result as string;
      reader.readAsDataURL(imagenASubir);
    }
  }

  /**
   * Devuelve falso si la fecha es la actual y la hora anterior a la hora actual y verdadero en otro caso.
   * @param fecha la fecha seleccionada por el usuario.
   * @param hora la hora seleccionada por el usuario.
   */
  esHoraValida(fecha: string, hora: string): boolean {
    let hoy: string = moment().format('YYYY-MM-DD');
    let ahora: string = moment().format('HH:mm');

    // Pregunta si la fecha es actual y la hora anterior a la hora actual.
    if (hoy === fecha && hora < ahora) {
      this.form['horaEntrega'].setErrors( { "horaInvalida": true });
      return false;
    }
    return true;
  }

  /**
   * Devuelve falso si la hora está en el horario de entrega de 07:00 a 00:00
   * @param hora la hora seleccionada por el usuario
   */
   esEnHoraEntrega(hora: string): boolean {
    let ahora: string = moment().format('HH:mm');

    // Pregunta si la fecha es actual y la hora anterior a la hora actual.
    if (hora > '00:00' && hora < '07:00') {
      this.form['horaEntrega'].setErrors( { "noEstaEnHorario": true });
      return false;
    }
    return true;
  }

  /**
   * Marca el formulario como enviado, comprueba las validaciones de los campos y, si pasan, alerta el éxito
   * por pantalla.
   */

  confirmarPedido(): void {
    if (this.formPedido.valid) {
      // Todas las validaciones son correctas, muestra un mensaje de éxito
      Swal.fire("Su pedido fue realizado con exito", "", "success");
      this.submitted = false;
      this.formPedido.reset({ ciudadComercio: 1 });
      this.formPedido.markAsUntouched();
      this.urlImagen = '';
    } else {
      // Al menos una validación no es correcta, muestra un mensaje de error
      Swal.fire("Revisar los datos ingresados", "", "error");
    }
  }

 completoDirecciones(): boolean {
    return this.form['calleNombreComercio'].valid && this.form['ciudadComercio'].valid
     && this.form['calleNombreDomicilio'].valid &&  this.form['ciudadDomicilio'].valid;
  }



  /**
   * Calcula el monto total a pagar por el usuario según el precio del producto.
   */
  calcularTotal(): number {
    const inputPrecio = document.getElementById("precioPedido") as HTMLInputElement;
    const valorInput = inputPrecio.value;
    const valorNumerico = parseFloat(valorInput);
    
    this.totalAPagar = 500 + valorNumerico
    


    this.form['montoAAbonar'].setValidators([
      Validators.min(this.totalAPagar),
      Validators.max(999999),
      ConditionalValidator.conditionalValidator(() => this.formaPago === 'efectivo', Validators.required)]);

    return this.totalAPagar;
  }

  

   buscarCiudad() {

    const input = document.getElementById("ciudadInput") as HTMLInputElement;
    const ciudadInput = input.value.toLowerCase();
    const datalist = document.getElementById("ciudades") as HTMLDataListElement;
    
    const options = Array.from(datalist.options);

    if (ciudadInput !== "cordoba" && ciudadInput !== "carlos paz") {
      alert("Por favor, ingrese 'Cordoba' o 'Carlos Paz'."); // Mostrar una alerta si el valor no coincide
      input.value = ""; // Limpiar el input
    }
  
    for (let option of options) {
      const ciudad = option.value.toLowerCase();
  
      if (ciudad.includes(ciudadInput)) {
        option.style.display = "block"; // Mostrar la opción si hay coincidencia
      } else {
        option.style.display = "none"; // Ocultar la opción si no hay coincidencia
      }
    }
  }

  ciudadValidator(control: FormControl): ValidationErrors | null {
    const validCities = ['Cordoba', 'Carlos Paz'];
    const inputValue = control.value;
  
    if (validCities.includes(inputValue)) {
      return null; // La validación pasó, no hay error
    } else {
      return { invalidCiudad: true }; // La validación falló, retorna un error
    }
  }
  
  
}








