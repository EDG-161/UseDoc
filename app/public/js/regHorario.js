$('#form_horario').submit(function(e){
  var cont = 0;

  for (var i = 0; i < 7; i++) {
    if ($('#d'+i).prop('checked')) {
      cont++;
    }
  }
  if (cont>0) {
    let hi = $('#hi').val();
    let hf = $('#hf').val();
    let th = $('#th').val();
    let hv = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    let thv = /^[0][0-1]:[0-5][0-9]$/
    if (hv.test(hi)&&hv.test(hf)&&hv.test(th)) {
      if ($('#hi').val()<$('#hf').val()) {
        if (hv.test(th)) {
          if (th>="00:10"&&th<="02:00") {

          }else{
            e.preventDefault();
            toastr.error('El tiempo promedio de cita debe ser de entre 10min y 2 hrs','Error');
          }
        }else{
          e.preventDefault();
          toastr.error('El tiempo promedio de cita no es valido','Error');
        }
      }else{
        e.preventDefault();
        toastr.error('La hora de salida debe ser mayor a la de entrada','Error');
      }
    }else{
      e.preventDefault();
      toastr.error('Ingresa horas validas','Error');
    }
  }else{
    e.preventDefault();
    toastr.error('Debes seleccionar al  menos un día de trabajo','Error');
  }
});

function valida(){
  var cont = 0;

  for (var i = 0; i < 7; i++) {
    if ($('#d'+i).prop('checked')) {
      cont++;
    }
  }
  if (cont>0) {
    let hi = $('#hi').val();
    let hf = $('#hf').val();
    let th = $('#th').val();
    let hv = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    let thv = /^[0][0-1]:[0-5][0-9]$/
    if (hv.test(hi)&&hv.test(hf)&&hv.test(th)) {
      if ($('#hi').val()<$('#hf').val()) {
        if (hv.test(th)) {
          if (th>="00:10"&&th<="02:00") {
            $('#form_horario').submit();
          }else{
            toastr.error('El tiempo promedio de cita debe ser de entre 10min y 2 hrs','Error');
          }
        }else{
          toastr.error('El tiempo promedio de cita no es valido','Error');
        }
      }else{
        toastr.error('La hora de salida debe ser mayor a la de entrada','Error');
      }
    }else{
      toastr.error('Ingresa horas validas','Error');
    }
  }else{
    toastr.error('Debes seleccionar al  menos un día de trabajo','Error');
  }
}

function mostrar(){
  var t = '<form class="" action="editarHorario" id="form_horario" method="post">'
     t +='<div class="col-md-3">'
     t +=    '<div class="form_group">'
     t +=      '<label for="dias">Selecciona tus días de trabajo</label>'
     t +=      '<div class="row">'
     t +='  <div class="col-md-6">'
     t +=          '<div class="checkbox">'
     t +='<label><input type="checkbox" id="d0" name="L">Lunes</label>'
     t +='</div>'
     t +='<div class="checkbox">'
     t +='  <label><input type="checkbox" id="d1" name="M">Martes</label>'
     t +='  </div>'
     t +='<div class="checkbox">'
     t +='<label><input type="checkbox" id="d2" name="N">Miércoles</label>'
     t +='</div>'
     t +='<div class="checkbox">'
     t +='<label>'
     t +='  <input type="checkbox" id="d3" name="J">Jueves'
     t +='</label>'
     t +='</div>'
     t +='  </div>'
     t +='<div class="col-md-6">'
     t +='<div class="checkbox">'
     t +='<label><input type="checkbox" id="d4" name="V">Viernes</label>'
     t +='  </div>'
     t +='<div class="checkbox">'
     t +='  <label><input type="checkbox" id="d5" name="S">Sabado</label>'
     t +='</div>'
     t +='<div class="checkbox">'
     t +='  <label><input type="checkbox" id="d6" name="D">Domingo</label>'
     t +='  </div>'
     t +='</div>'
     t +='</div>'
     t +='</div>'
     t +='</div>'
     t +='<div class="col-md-2">'
     t +='<div class="form_group">'
     t +='  <label for="">Ingresa tu hora de entrada</label>'
     t +='<input type="time" required id="hi" name="hi" class="form-control">'
     t +='  </div>'
     t +='  <div class="form_group">'
     t +='  <label for="">Ingresa tu hora de salida</label>'
     t +='  <input type="time" required id="hf" name="hf" class="form-control">'
     t +='  </div>'
     t +='</div>'
     t +='<div class="col-md-2">'
     t +='<div class="form-group">'
     t +='<label for="th">Ingresa el tiempo estimado para una cita</label>'
     t +='<input name="th" required id="th" type="time" min="00:00" max="02:00" class="form-control">'
     t +='    </div>'
     t +='    <div class="form-group">'
     t +='<input type="button" onclick="valida()" class="btn btn-primary" value="Editar horario"> '
     t +='</div>'
     t +='    <div class="form-group">'
     t +='<input type="button" onclick="nmostrar()" class="btn btn-danger" value="Cancelar"> '
     t +='</div>'
     t +='  </div>'
     t +='  </form>';

 document.getElementById('mostrar').innerHTML = t;
}
function nmostrar() {
  document.location.reload();
}
