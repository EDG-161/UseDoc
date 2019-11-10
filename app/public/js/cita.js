var cenf = [
	'Alteraciones De La Nutrición','Enfermedades Endocrinas y Metabólicas','Trastornos Gastrointestinales','Enfermedades Hepáticas y Biliares',
'Enfermedades MusculoEsqueléticas y Del Tejido Conjuntivo','Neumología','Otorrinolaringología','Oftalmología','Patología Dental y Oral',
 'Trastornos Dermatológicos','Hematología y Oncología','Enfermedades Alérgicas ', 'Enfermedades Infecciosas', 'Neurología','Trastornos Psiquiátricos',
 'Trastornos Cardiovasculares','Trastornos Genitourinarios', 'Ginecología y Obstetricia','Pediatría','Trastornos Causados Por Agentes Físicos', 'Intoxicaciones'];
var uni = ['','Tabletas','mg','ml','Unidades'];
	var n = 0;
$('input[name="nec"]').change(function(e){
  if ($(this).val()=='1') {
    var text = '<table class="table table-hover">'
      text += '<thead class="thead-dark"	>';
      text += '  <tr>';
      text += '    <th scope="col">Nombre del estudio</th>';
      text += '  </tr>';
      text += '</thead>';
      text += '<tbody id="lab-tb">';
      text += '  </tbody>';
      text += '  </table>';
      text += '  <button type="button" id="add-lab" class="btn btn-success" onclick="addLab()" name="button">';
      text += '    <i class="fa fa-plus-circle"></i>';
      text += '  </button>';
      text += '  <button type="button" id="less-lab" onclick="lessLab()" class="btn btn-success" name="button">';
      text += '    <i class="">-</i>';
      text += '  </button>';
			document.getElementById('labn').style.display= "none";
			document.getElementById('lab').innerHTML= text;
  }else{
		var text = ""
      document.getElementById('lab').innerHTML= "";
			document.getElementById('labn').style.display= "block";
  }
});

$('#add-vid').click(function(){
	$(this).attr("disabled","disabled");
	var index = $('#vie_tb tr:last-child').index();
	var ntr = '<tr>' +
			'<td><input type="text" class="form-control" placeholder="Ingresa el aspecto" name="as" id="dio"></td>' +
			'<td><input type="button" id="add-vid-btn" onclick="agrVivienda()" class="btn btn-success" value="Agregar"></td>' +
	'</tr>';
	$('#vie_tb').append(ntr);
});

$('#less-vid').click(function(e){
 var td = "";
	$('#vie_tb').find("tr:not(:last-child)").each(function(){
		td += "<tr>"+$(this).html()+"</tr>";
	});
	$('#vie_tb').html(td);
	$('#add-vid').removeAttr("disabled");
});

$('#add-alr').click(function(){
	$(this).attr("disabled","disabled");
	$('#less-alr').attr("disabled","disabled");
	var index = $('#alr-tb tr:last-child').index();
	var ntr = '<tr>' +
			'<td><input type="text" class="form-control" placeholder="Ingresa la alergia" name="as" id="name-alr"></td>' +
			'<td><input type="button" id="add-ale-btn" onclick="agrAlergia()" class="btn btn-success" value="Agregar"></td>' +
	'</tr>';
	$('#alr-tb').append(ntr);
});

$('#less-alr').click(function(e){
 var td = "";
	$('#alr-tb').find("tr:not(:last-child)").each(function(){
		td += "<tr>"+$(this).html()+"</tr>";
	});
	$('#alr-tb').html(td);

});

$('#add-enp').click(function(){
	$(this).attr("disabled","disabled");
	$('#less-enp').attr("disabled","disabled");
	var index = $('#enp-tb tr:last-child').index();
	var ntr = '<tr>' +
			'<td><input type="text" class="form-control" placeholder="Ingresa el aspecto" name="enf-name" id="enf-name"></td>' +
			'<td><input type="text"  class="form-control" placeholder="Ingresa el aspecto" name="par-enp" id="par-enp"></td>' +
			'<td><select name="cate" class="form-control" style="height:auto" id="cate">'+
			'<option value="1"> | Alteraciones De La Nutrición                              | </option>'+
			'<option value="2"> | Enfermedades Endocrinas y Metabólicas                     | </option>'+
			'<option value="3"> | Trastornos Gastrointestinales                             | </option>'+
			'<option value="4"> | Enfermedades Hepáticas y Biliares                         | </option>'+
			'<option value="5"> | Enfermedades MusculoEsqueléticas y Del Tejido Conjuntivo  | </option>'+
			'<option value="6"> | Neumología                                                | </option>'+
			'<option value="7"> | Otorrinolaringología                                      | </option>'+
			'<option value="8"> | Oftalmología                                              | </option>'+
			'<option value="9"> | Patología Dental y Oral                                   | </option>'+
			'<option value="10"> | Trastornos Dermatológicos                                 | </option>'+
			'<option value="11"> | Hematología y Oncología                                   | </option>'+
			'<option value="12"> | Enfermedades Alérgicas                                    | </option>'+
			'<option value="13"> | Enfermedades Infecciosas                                  | </option>'+
			'<option value="14"> | Neurología                                                | </option>'+
			'<option value="15"> | Trastornos Psiquiátricos                                  | </option>'+
			'<option value="16"> | Trastornos Cardiovasculares                               | </option>'+
			'<option value="17"> | Trastornos Genitourinarios                                | </option>'+
			'<option value="18"> | Ginecología y Obstetricia                                 | </option>'+
			'<option value="19"> | Pediatría                                                 | </option>'+
			'<option value="20"> | Trastornos Causados Por Agentes Físicos                   | </option>'+
			'<option value="21"> | Intoxicaciones                                            | </option>'+
			'</select></td>' +
			'<td><input type="button" id="add-vid-btn" onclick="agrEnferPar()" class="btn btn-success" value="Agregar"></td>' +
	'</tr>';
	$('#enp-tb').append(ntr);
});

$('#less-enp').click(function(e){
 var td = "";
	$('#enp-tb').find("tr:not(:last-child)").each(function(){
		td += "<tr>"+$(this).html()+"</tr>";
	});
	$('#enp-tb').html(td);

});

$('#add-cir').click(function(){
	$(this).attr("disabled","disabled");
	$('#less-cir').attr("disabled","disabled");
	var index = $('#cir-tb tr:last-child').index();
	var ntr = '<tr>' +
			'<td><input type="text" class="form-control" placeholder="Ingresa la Cirugia" name="name-cir" id="name-cir"></td>' +
			'<td><input type="date" class="form-control" placeholder="Ingresa la Cirugia" name="name-cir" id="date-cir"></td>' +
			'<td><input type="button" id="add-cir-btn" onclick="agrCir()" class="btn btn-success" value="Agregar"></td>' +
	'</tr>';
	$('#cir-tb').append(ntr);
});

$('#less-cir').click(function(e){
 var td = "";
	$('#cir-tb').find("tr:not(:last-child)").each(function(){
		td += "<tr>"+$(this).html()+"</tr>";
	});
	$('#cir-tb').html(td);

});

$('#add-sis').click(function(){
	$(this).attr("disabled","disabled");
	$('#less-sis').attr("disabled","disabled");
	var index = $('#cir-sis tr:last-child').index();
	var ntr = '<tr>' +
			'<td><input type="text" class="form-control" placeholder="Ingresa el sintoma" name="name-sis" id="name-sis"></td>' +
			'<td><input type="text" class="form-control" placeholder="Ingresa una nota (opcional)" name="des-sis" id="des-sis"></td>' +
			'<td><input type="date" class="form-control" name="date-sis" id="date-sis"></td>' +
			'<td><input type="button" id="add-sis-btn" onclick="agrSis()" class="btn btn-success" value="Agregar"></td>' +
	'</tr>';
	$('#sis-tb').append(ntr);
});

$('#less-sis').click(function(e){
 var td = "";
	$('#sis-tb').find("tr:not(:last-child)").each(function(){
		td += "<tr>"+$(this).html()+"</tr>";
	});
	$('#sis-tb').html(td);

});

$('#add-med').click(function(){
	$(this).attr("disabled","disabled");
	$('#less-med').attr("disabled","disabled");
	var index = $('#cir-med tr:last-child').index();
	var ntr = '<tr>' +
			'<td><input type="text" class="form-control" placeholder="Ingresa el medicamento" name="name-med" id="name-med"></td>' +
			'<td><input type="text" class="form-control" placeholder="Ingresa la cantidad usada" name="des-med" id="des-med"></td>' +
			'<td><select class="form-control" name="cat-med" id="cat-med" style="height:auto">'+
			'<option value="1">Tabletas</option>'+
			'<option value="2">mg</option> '+
			'<option value="3">ml</option> '+
			'<option value="4">Unidades</option> '+
			'</select></td>' +
			'<td><input type="button" id="add-sis-btn" onclick="agrMed()" class="btn btn-success" value="Agregar"></td>' +
	'</tr>';
	$('#med-tb').append(ntr);
});

$('#less-med').click(function(e){
 var td = "";
	$('#med-tb').find("tr:not(:last-child)").each(function(){
		td += "<tr>"+$(this).html()+"</tr>";
	});
	$('#med-tb').html(td);

});

function addLab(){
	$(this).attr("disabled","disabled");
	$('#less-lab').attr("disabled","disabled");
	var ntr = '<tr>' +
			'<td><input type="text" class="form-control" placeholder="Ingresa el estudio" name="name-lab" id="name-lab"></td>' +
			'<td><input type="button" id="add-sis-btn" onclick="agrExa()" class="btn btn-success" value="Agregar"></td>' +
	'</tr>';
	$('#lab-tb').append(ntr);
}

function lessLab(e){
 var td = "";
	$('#lab-tb').find("tr:not(:last-child)").each(function(){
		td += "<tr>"+$(this).html()+"</tr>";
	});
	$('#lab-tb').html(td);
}

function agrExa() {
	var name = $('#name-lab').val();
	if (name.length>0) {
		$("#lab-tb").find("tr:last-child").each(function(){
			$(this).html("<td>"+name+"</td>");
		});
		$('#add-lab').removeAttr("disabled");
		$('#less-lab').removeAttr("disabled");
	}else{
		toastr.error("Ingresa los datos","Error");
		$('#name-lab').focus();
	}
}
function agrMed() {
	var nombre = $('#name-med').val();
	var parentesco = $('#des-med').val();
	var cate = uni[($('#cat-med').val())];
	var html = "";
	if (nombre.length>0 && parentesco.length>0) {
		$("#med-tb").find("tr:last-child").each(function(){
			$(this).html("<td>"+nombre+"</td>"+"<td>"+parentesco+"</td>"+"<td>"+cate+"</td>");
		});
		$('#add-med').removeAttr("disabled");
		$('#less-med').removeAttr("disabled");
	}else{
		toastr.error('Ingresa todos los valores','Error');
	}
}
function agrSis(){
	var aspecto = $('#name-sis').val();
	var daf = new Date($('#date-sis').val());
	var des = $('#des-sis').val();
	var fecha = daf.getDate()+ "-" + (daf.getMonth()+1) + "-" + daf.getFullYear();
	var fecv = /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[-](?:0?[1-9]|1[0-2])|(?:29|30)[-](?:0?[13-9]|1[0-2])|31[-](?:0?[13578]|1[02]))[-](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[-]0?2[-](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/;
	var html = "";
	if (aspecto.length>1 && (fecv.test(fecha)||fecv.test($('#date-cir').val()))) {
		if (des.length>0) {
			$("#sis-tb").find("tr:last-child").each(function(){
				$(this).html("<td>"+aspecto+"</td> "+"<td>"+des+"</td> "+"<td>"+fecha+"</td> ");
			});
		}else{
			$("#sis-tb").find("tr:last-child").each(function(){
				$(this).html("<td>"+aspecto+"</td> "+"<td>Sin notas</td> "+"<td>"+fecha+"</td> ");
			});
		}
		$('#add-sis').removeAttr("disabled");
		$('#less-sis').removeAttr("disabled");
	}else{
		toastr.error('Ingresa valores validos','Error');
	}
}
function agrEnferPar(){
	var nombre = $('#enf-name').val();
	var parentesco = $('#par-enp').val();
	var cate = cenf[($('#cate').val()-1)];
	var html = "";
	if (nombre.length>0 && parentesco.length>0) {
		$("#enp-tb").find("tr:last-child").each(function(){
			$(this).html("<td>"+nombre+"</td>"+"<td>"+parentesco+"</td>"+"<td>"+cate+"</td>");
		});
		$('#add-enp').removeAttr("disabled");
		$('#less-enp').removeAttr("disabled");
	}else{
		toastr.error('Ingresa todos los valores','Error');
	}
}
function agrAlergia(){
	var aspecto = $('#name-alr').val();
	var html = "";
	if (aspecto.length>10) {
		$("#alr-tb").find("tr:last-child").each(function(){
			$(this).html("<td>"+aspecto+"</td>");
		});
		$('#add-alr').removeAttr("disabled");
		$('#less-alr').removeAttr("disabled");
	}else{
		toastr.error('El aspecto debe tener una longitud minima de 10 caracteres','Error');
	}
}
function agrCir(){
	var aspecto = $('#name-cir').val();
	var daf = new Date($('#date-cir').val());
	var fecha = daf.getDate()+ "-" + (daf.getMonth()+1) + "-" + daf.getFullYear();
	var fecv = /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[-](?:0?[1-9]|1[0-2])|(?:29|30)[-](?:0?[13-9]|1[0-2])|31[-](?:0?[13578]|1[02]))[-](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[-]0?2[-](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/;
	var html = "";
	if (aspecto.length>1 && (fecv.test(fecha)||fecv.test($('#date-cir').val()))) {
		$("#cir-tb").find("tr:last-child").each(function(){
			$(this).html("<td>"+aspecto+"</td> "+"<td>"+fecha+"</td> ");
		});
		$('#add-cir').removeAttr("disabled");
		$('#less-cir').removeAttr("disabled");
	}else{
		toastr.error('Ingresa valores validos','Error');
	}
}
function agrVivienda(){
	var aspecto = $('#dio').val();
	var html = "";
	if (aspecto.length>10) {
		$("#vie_tb").find("tr:last-child").each(function(){
			$(this).html("<td>"+aspecto+"</td>");
		});
		$('#add-vid').removeAttr("disabled");
		$('#less-vid').removeAttr("disabled");
	}else{
		toastr.error('El aspecto debe tener una longitud minima de 10 caracteres','Error');
	}
}
