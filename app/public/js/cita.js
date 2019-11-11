var cenf = [
	'Alteraciones De La Nutrición','Enfermedades Endocrinas y Metabólicas','Trastornos Gastrointestinales','Enfermedades Hepáticas y Biliares',
'Enfermedades MusculoEsqueléticas y Del Tejido Conjuntivo','Neumología','Otorrinolaringología','Oftalmología','Patología Dental y Oral',
 'Trastornos Dermatológicos','Hematología y Oncología','Enfermedades Alérgicas ', 'Enfermedades Infecciosas', 'Neurología','Trastornos Psiquiátricos',
 'Trastornos Cardiovasculares','Trastornos Genitourinarios', 'Ginecología y Obstetricia','Pediatría','Trastornos Causados Por Agentes Físicos', 'Intoxicaciones'];
var uni = ['','Tabletas','mg','ml','Unidades'];
	var n = 0;
$('input[name="nec"]').change(function(e){
  if ($(this).val()=='1') {
    var text = '<div class="w3l-table-info agile_info_shadow">'+
		'<table class="table table-hover">'
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
      text += '  </button></div>';
			document.getElementById('labn').style.display= "none";
			lab[0]=true;
			document.getElementById('lab').innerHTML= text;
  }else{
		var text = ""
		lab[0] = false;
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
		$(this).find("td").each(function(){
			td +=$(this).text();
		});
		td +="</tr>";
	});
	vivienda.pop();
	$('#vie_tb').html(td);
	$('#add-vid').removeAttr("disabled");
});

$('#add-alr').click(function(){
	$(this).attr("disabled","disabled");
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
		$(this).find("td").each(function(){
			td +=$(this).text();
		});
		td +="</tr>";
	});
	alergias.pop();
	$('#alr-tb').html(td);
	$('#add-alr').removeAttr("disabled");
});

$('#add-enp').click(function(){
	$(this).attr("disabled","disabled");

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
		$(this).find("td").each(function(){
			td +=$(this).text();
		});
		td +="</tr>";
	});
	enfermedadesParentales.pop();
	$('#enp-tb').html(td);
	$('#add-enp').removeAttr("disabled");
});

$('#add-cir').click(function(){
	$(this).attr("disabled","disabled");
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
		$(this).find("td").each(function(){
			td +=$(this).text();
		});
		td +="</tr>";
	});
	cirugias.pop();
	$('#cir-tb').html(td);
	$('#add-cir').removeAttr("disabled");
});

$('#add-sis').click(function(){
	$(this).attr("disabled","disabled");
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
		$(this).find("td").each(function(){
			td +=$(this).text();
		});
		td +="</tr>";
	});
	sintomas.pop();
	$('#sis-tb').html(td);
	$('#add-sis').removeAttr("disabled");
});

$('#add-med').click(function(){
	$(this).attr("disabled","disabled");
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
		$(this).find("td").each(function(){
			td +=$(this).text();
		});
		td +="</tr>";
	});
	medicamentos.pop();
	$('#med-tb').html(td);
	$('#add-med').removeAttr("disabled");
});

$('#add-dig').click(function(){
	$(this).attr("disabled","disabled");

	var ntr = '<tr>' +
			'<td><input type="text" class="form-control" placeholder="Ingresa diagnostico" name="dig-name" id="enf-dig"></td>' +
			'<td><select name="cate" class="form-control" style="height:auto" id="cat-dig">'+
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
			'<td><input type="text"  class="form-control" placeholder="Ingresa alguna nota" name="par-dig" id="par-dig"></td>' +
			'<td><input type="button" id="add-dig-btn" onclick="agrDig()" class="btn btn-success" value="Agregar"></td>' +
	'</tr>';
	$('#dig-tb').append(ntr);
});

$('#less-dig').click(function(e){
 var td = "";
	$('#dig-tb').find("tr:not(:last-child)").each(function(){
		td += "<tr>"+$(this).html()+"</tr>";
		$(this).find("td").each(function(){
			td +=$(this).text();
		});
		td +="</tr>";
	});
	diagnostico.pop();
	$('#dig-tb').html(td);
	$('#add-dig').removeAttr("disabled");
});

$('#add-tra').click(function(){
	$(this).attr("disabled","disabled");
	var ntr = '<tr>' +
			'<td><input type="text" class="form-control" placeholder="Ingresa el medicamento" name="name-tra" id="name-tra"></td>' +
			'<td><input type="text" class="form-control" placeholder="Ingresa la cantidad usada" name="des-tra" id="des-tra"></td>' +
			'<td><select class="form-control" name="cat-tra" id="cat-tra" style="height:auto">'+
			'<option value="1">Tabletas</option>'+
			'<option value="2">mg</option> '+
			'<option value="3">ml</option> '+
			'<option value="4">Unidades</option> '+
			'</select></td>' +
			'<td><input type="time" class="form-control" placeholder="Ingresa el numero de horas entre cada dosis" name="hor-tra" id="hor-tra"></td>' +
			'<td><input type="number" min="1" step="1" class="form-control" placeholder="Ingresa la de días que durara el tratamiento" name="dis-tra" id="did-tra"></td>' +
			'<td><input type="button" id="add-tra-btn" onclick="agrTra()" class="btn btn-success" value="Agregar"></td>' +
	'</tr>';
	$('#tra-tb').append(ntr);
});

$('#less-tra').click(function(e){
 var td = "";
	$('#tra-tb').find("tr:not(:last-child)").each(function(){
		td += "<tr>"+$(this).html()+"</tr>";
		$(this).find("td").each(function(){
			td +=$(this).text();
		});
		td +="</tr>";
	});
	tratamiento.pop();
	$('#tra-tb').html(td);
	$('#add-tra').removeAttr("disabled");
});

function addLab(){
	if ($('input[name="nec"]').val()==1&&lab[0]) {
		$(this).attr("disabled","disabled");
		var ntr = '<tr>' +
				'<td><input type="text" class="form-control" placeholder="Ingresa el estudio" name="name-lab" id="name-lab"></td>' +
				'<td><input type="button" id="add-sis-btn" onclick="agrExa()" class="btn btn-success" value="Agregar"></td>' +
		'</tr>';
		$('#lab-tb').append(ntr);
	}
}

function lessLab(e){
 var td = "";
 	if ($('input[name="nec"]').val()==1&&lab[0]) {
		$('#lab-tb').find("tr:not(:last-child)").each(function(){
			td += "<tr>"+$(this).html()+"</tr>";
			$(this).find("td").each(function(){
				td +=$(this).text();
			});
			td +="</tr>";
		});
		$('#lab-tb').html(td);
		lab[1].pop();
	}
}
function agrDig() {
	var pade = $('#enf-dig').val();
	var cla = cenf[$('#cat-dig').val()-1];
	var note = $('#par-dig').val();
	if (pade.length>0) {
		if (note.length<1) {
			note = "Sin notas";
		}
		$("#dig-tb").find("tr:last-child").each(function(){
			$(this).html("<td>"+"</td>"+"<td>"+"</td>"+"<td>"+"</td>");
			$(this).find("td").eq(0).text(pade);
			$(this).find("td").eq(1).text(cla);
			$(this).find("td").eq(2).text(note);
			diagnostico.push([pade,cla,note]);
		});
		$('#add-dig').removeAttr("disabled");
		$('#less-dig').removeAttr("disabled");
	}else{
		toastr.error('Ingresa un diagnostico','Error');
	}
}
function agrExa() {
	var name = $('#name-lab').val();
	if (name.length>0) {
		$("#lab-tb").find("tr:last-child").each(function(){
			$(this).html("<td>"+"</td>");
			$(this).find("td").each(function() {
				$(this).text(name);
				if (lab[0]) {
					lab[1].push([name]);
				}
			});
		});
		$('#add-lab').removeAttr("disabled");
		$('#less-lab').removeAttr("disabled");
	}else{
		toastr.error("Ingresa los datos","Error");
		$('#name-lab').focus();
	}
}
function agrTra() {
	var nombre = $('#name-tra').val();
	var parentesco = $('#des-tra').val();
	var cate = uni[($('#cat-tra').val())];
	var numv =/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
	var hor = $('#hor-tra').val();
	var dias = $("#did-tra").val();
	var num = /^([0-9])+$/;
	var html = "";
	if (nombre.length>0 && parentesco.length>0 && numv.test(hor)&&num.test(dias)) {
		$("#tra-tb").find("tr:last-child").each(function(){
			$(this).html("<td>"+"</td>"+"<td>"+"</td>"+"<td>"+"</td>"+"<td>"+"</td>"+"<td>"+"</td>");
			$(this).find("td").eq(0).text(nombre);
			$(this).find("td").eq(1).text(parentesco);
			$(this).find("td").eq(2).text(cate);
			$(this).find("td").eq(3).text(hor);
			$(this).find("td").eq(4).text(dias);
			tratamiento.push([nombre,paentesco,cate,hor,dias]);
		});
		$('#add-tra').removeAttr("disabled");
		$('#less-tra').removeAttr("disabled");
	}else{
		alert(numv.test(hor));
			alert(num.test(dias))
		toastr.error('Ingresa valores validos','Error');
	}
}
function agrMed() {
	var nombre = $('#name-med').val();
	var parentesco = $('#des-med').val();
	var cate = uni[($('#cat-med').val())];
	var html = "";
	if (nombre.length>0 && parentesco.length>0) {
		$("#med-tb").find("tr:last-child").each(function(){
			$(this).html("<td>"+"</td>"+"<td>"+"</td>"+"<td>"+"</td>");
			$(this).find("td").eq(0).text(nombre);
			$(this).find("td").eq(1).text(parentesco);
			$(this).find("td").eq(2).text(cate);
			medicamentos.push([nombre,parentesco,cate]);
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
				$(this).html("<td>"+"</td>"+"<td>"+"</td>"+"<td>"+"</td>");
				$(this).find("td").eq(0).text(aspecto);
				$(this).find("td").eq(1).text(des);
				$(this).find("td").eq(2).text(fecha);
				sintomas.push([aspecto,des,fecha]);
			});
		}else{
			$("#sis-tb").find("tr:last-child").each(function(){
				$(this).html("<td>"+"</td>"+"<td>"+"</td>"+"<td>"+"</td>");
				$(this).find("td").eq(0).text(aspecto);
				$(this).find("td").eq(1).text("Sin notas");
				$(this).find("td").eq(2).text(fecha);
				sintomas.push([aspecto,"Sin notas",fecha]);
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
			$(this).html("<td>"+"</td>"+"<td>"+"</td>"+"<td>"+"</td>");
			$(this).find("td").eq(0).text(nombre);
			$(this).find("td").eq(1).text(parentesco);
			$(this).find("td").eq(2).text(cate);
		});
		enfermedadesParentales.push([nombre,parentesco,cate]);
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
			$(this).html("<td>"+"</td>");
			$(this).find("td").each(function() {
				$(this).text(aspecto);
			});
			alergias.push([aspecto]);
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
			$(this).html("<td>"+"</td>"+"<td>"+"</td>"+"<td>"+"</td>");
			$(this).find("td").eq(0).text(aspecto);
			$(this).find("td").eq(1).text(fecha);
		});
		cirugias.push([aspecto,fecha]);
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
			$(this).html("<td>"+"</td>");
			$(this).find("td").each(function() {
				$(this).text(aspecto);
			});
		});
		$('#add-vid').removeAttr("disabled");
		$('#less-vid').removeAttr("disabled");
		vivienda.push(aspecto)
	}else{
		toastr.error('El aspecto debe tener una longitud minima de 10 caracteres','Error');
	}
}

function guardarHistoria() {
	var historia = {
		"enfermedadesParentales":enfermedadesParentales,
		"vivienda":vivienda,
		"alergias":alergias,
		"cirugias":cirugias
	}
	var j = JSON.stringify(historia);
	j = j.replace(/"/gi, "_")
	$.ajax({
				method : 'GET',
        url : 'http://localhost:3000/guardarHistoria',
        data : j,
        dataType : 'text',
        success : function(response){
             var res = JSON.parse(response);
						 if (res.tipo=="success") {
						 	toastr.success(res.mensaje,"Exito")
						 }
        },
        error: function(error){
             console.log(error);
        }
    });
}

function guardarCita(){

}
