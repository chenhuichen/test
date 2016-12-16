/*var student =[{"name":1,"studernt":2},{"name":2,"studernt":3}];

var json = JSON.stringify(student); 
alert(json); 	*/
	
	$.ajax({
			type: "post",
			url:  '/listUsers', 
			data:{},
			dataType: "json",
			success: function(res) {
				 var js = eval("(" + res + ")");
				initTable(js);
			},
			error: function(err) {
				/*回调函数*/
			}
		});
		
function initTable(data){
	$(".data-table tbody").html("");
	var tbody = '';
	for(var i = 0; i < data.length; i++){
		tbody += '<tr> ';
		tbody += '<td>'+data[i].id+'</td>';
		tbody += '<td>'+data[i].name+'</td>';
		tbody += '<td>'+data[i].password+'</td>';
		tbody += '<td>'+data[i].profession+'</td>';
		tbody += '<td><a onclick =\"selectone('+data[i].id+')\">编辑</a>'+
		              '<a onclick =\"deleteuser('+data[i].id+')\">删除</a></td>';
		tbody += '</tr> ';
	}
	$(".data-table tbody").html(tbody);
}
function selectone(id){
		$.ajax({
			type: "post",
			url:  '/'+id, 
			data:{},
			dataType: "json",
			success: function(res) {
				 $("#model").css("display","");
				$("#id").val(res.id);
				$("#username").val(res.name);
				$("#pwd").val(res.password);
				$("#position").val(res.profession);
				
			},
			error: function(err) {
				/*回调函数*/
			}
		});
}

function add(){
		$.ajax({
			type: "post",
			url:  '/addUser', 
			data:{
				id : $("#id").val(),
				name : $("#username").val(),
				password : $("#pwd").val(),
				profession : $("#position").val(),
				},
			dataType: "json",
			success: function(res) {
				 $("#model").css("display","none");
				 initTable(res);
			},
			error: function(err) {
				/*回调函数*/
			}
		});
}

function deleteuser(id){
		$.ajax({
			type: "post",
			url:  '/deleteUser', 
			data:{
				idd : id,
				},
			dataType: "json",
			success: function(res) {
				$("#model").css("display","none");
				 initTable(res);
			},
			error: function(err) {
				/*回调函数*/
			}
		});
}