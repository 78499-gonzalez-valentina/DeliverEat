import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConditionalValidator } from "../shared/validators/conditional.validator";
import { DateTimeValidator } from "../shared/validators/date.time.validator";
import { Ciudad, ciudades } from "./shared/models/ciudad.model";
import { DireccionEntrega, direccionesEntrega } from "./shared/models/direccion-entrega.model";
import * as moment from "moment/moment";
import Swal from 'sweetalert2';
const precio = document.getElementById("precioPedido") as HTMLInputElement;


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

  posicion: google.maps.LatLngLiteral = { lat: -31.4290879, lng: -64.18715 }

  zoom: number = 15;

  posicionMarcador: google.maps.LatLngLiteral;

  agregoMarcador: boolean = false;

  opcionesMarcador: google.maps.MarkerOptions = { draggable: false };

  distancia: number;

  totalAPagar: number;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    // Inicializa el formulario.
    this.buildForm();

    // Actualiza la posición del mapa cuando se elija una ciudad para el comercio.
    this.form['ciudadComercio'].valueChanges
      .subscribe((valor) => {
        let ciudad: Ciudad = ciudades.find(c => c.id === valor) as Ciudad;
        this.posicion = ciudad.posicion;
        this.posicionMarcador = ciudad.posicion;
      })

    // Actualiza valores y validez de los campos piso y letra de departamento ante un cambio en el checkbox.
    this.form['checkboxEsDepartamento'].valueChanges
      .subscribe(() => {
        this.form['pisoDepto'].updateValueAndValidity();
        this.form['letraDepto'].updateValueAndValidity();
      });

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

  get checkboxEsDepartamento(): boolean {
    return this.form['checkboxEsDepartamento'].value;
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
      precioPedido: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(240)]],
      imagen: [null],
      calleNombreComercio: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(240)]],
      ciudadComercio: [1, [Validators.required]],
      referenciaComercio: [null, [Validators.minLength(3), Validators.maxLength(240)]],
      calleNombreDomicilio: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(240)]],
      calleNumeroDomicilio: [null, [Validators.required, Validators.pattern("[0-9]{1,5}")]],
      checkboxEsDepartamento: [null],
      pisoDepto: [null, [
        Validators.pattern("[0-9]{1,2}"),
        ConditionalValidator.conditionalValidator(() => this.checkboxEsDepartamento, Validators.required)]],
      letraDepto: [null, [
        Validators.pattern("[A-Z]{1}"),
        ConditionalValidator.conditionalValidator(() => this.checkboxEsDepartamento, Validators.required)]],
      ciudadDomicilio: [null ,Validators.required],
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
    this.submitted = true;
    if (this.formPedido.invalid) Swal.fire("Revisar los datos ingresados", "", "error"); return;;
    Swal.fire("Su pedido fue realizado con exito", "You clicked the button!", "success");
    

    // Reseteamos bandera y estado del formulario.
    this.submitted = false;
    this.formPedido.reset({ ciudadComercio: 1 });
    this.formPedido.markAsUntouched();
    this.agregoMarcador = false;
    this.urlImagen = '';
  }

  /**
   * Agrega un marcador al mapa interactivo ante un toque por parte del usuario y autocompleta la dirección.
   * @param evento toque en una parte del mapa por parte del usuario.
   */
  agregarMarcador(evento: google.maps.MapMouseEvent): void {
    this.agregoMarcador = true;
    if (evento.latLng != null) this.posicionMarcador = evento.latLng.toJSON();

    // Obtiene la dirección del comercio de manera aleatoria.
    let indice: number = Math.floor(Math.random() * 5);
    let direccionRnd: DireccionEntrega = direccionesEntrega.filter(d => d.ciudad.id === this.ciudadComercio)[indice];

    // Autocompleta la dirección del comercio en el formulario.
    this.formPedido.patchValue(
      {
        calleNombreComercio: direccionRnd.calleNombre + ' ' + direccionRnd.calleNumero
      });
  }

  /**
   * Devuelve verdadero si el usuario completó todos los campos requeridos para las direcciones y falso en otro caso.
   */
 completoDirecciones(): boolean {
    return this.form['calleNombreComercio'].valid && this.form['ciudadComercio'].valid
     && this.form['calleNombreDomicilio'].valid &&  this.form['ciudadDomicilio'].valid;
  }

  /**
   * Calcula la distancia en kilómetros entre la dirección de comercio y la dirección de entrega del pedido.
   */
 //7
 calcularDistancia(): number {
    let posicionDomicilio: google.maps.LatLngLiteral
      = (ciudades.find(c => c.id === this.ciudadDomicilio) as Ciudad).posicion;

    let posicionComercio: google.maps.LatLngLiteral;
    // Si agregó un marcador para la dirección del comercio, tomo esa dirección.
    if (this.posicionMarcador) posicionComercio = this.posicionMarcador as google.maps.LatLngLiteral;
    // Si no, se obtiene de manera aleatoria.
    else {
      // Obtiene la latitud y longitud del comercio de manera aleatoria.
      let indice: number = Math.floor(Math.random() * 5);
      let direccionRnd: DireccionEntrega = direccionesEntrega.filter(d => d.ciudad.id === this.ciudadComercio)[indice];
      posicionComercio = direccionRnd.posicion;
      this.posicionMarcador = posicionComercio;
    }
    this.distancia = Number((google.maps.geometry.spherical.computeLength([
      posicionDomicilio, posicionComercio]) / 1000).toFixed(2));
    return this.distancia;
  }

  /**
   * Calcula el monto total a pagar por el usuario según la distancia a recorrer por el cadete.
   */
  calcularTotal(): number {
    this.totalAPagar = 500 
    

    //this.totalAPagar = (this.distancia / 0.5) * 250;
    //if (this.distancia < 0.5) this.totalAPagar = 250;

    this.form['montoAAbonar'].setValidators([
      Validators.min(this.totalAPagar),
      Validators.max(999999),
      ConditionalValidator.conditionalValidator(() => this.formaPago === 'efectivo', Validators.required)]);

    return this.totalAPagar;
  }
}








