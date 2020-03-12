// 设置全局变量
var num = 1
var rowNum = 1
var url = 'http://47.96.238.48:5000/'

// 添加一行
$('#add_btn').bind('click', addRow)
// 清除首行数据
$('#clear_btn0').bind('click', clearDiv)
// 保存前端输入数据
$('#save_btn').bind('click', save)
// 加载数据库中数据
showData()

// 第一个表格第一行清除行中数据
function clearDiv() {
	$('#question0 div').html("")
	$('#description0 div').html("")
}
// 第一个表格增加行
function addRow() {
	$('<tr id="topRow' + num.toString() + '"></tr>').appendTo($('#table0'))

	$('<td id=\"question' + num.toString() + '\">' +
		'<div contenteditable="true"' +
		'id="topdiv' + num.toString() + '"' +
		'></div>' +
		'</td>').appendTo($('#topRow' + num.toString()))

	$('<td id=\"description' + num.toString() + '\">' +
		'<div contenteditable="true"></div>' +
		'</td>').appendTo($('#topRow' + num.toString()))

	$('<td id="operation' + num.toString() + '">' +
		'<button ' +
		'id=\"del_btn' + num.toString() + '\"' +
		'onClick=\"del_row(' + num.toString() + ')\">' +
		'删除</button></td>').appendTo($('#topRow' + num.toString()))
	num = num + 1
}

// 第一个表格删除行
function del_row(row_id) {
	if (confirm('确定删除该行？')) {
		$('#topRow' + row_id).remove()
		num = num - 1
	}
}

// 第一个表格保存数据
function save() {
	var len = $('#table0').length
	console.log(num)
	var questions = []
	var descriptions = []
	for (var i = 0; i < num; i++) {
		var q = $('#question' + i.toString() + ' div').html()
		var d = $('#description' + i.toString() + ' div').html()
		if (q=='' || d==''){
			alert('请检查数据是否为空')
			break
		}
		questions.push(q)
		descriptions.push(d)
		console.log(questions, descriptions)
	}
	var data = {
		'question': questions,
		'description': descriptions
	}
	// $('#table1 td').remove()
	rowNum = 1
	data = JSON.stringify(data)
	console.log(typeof(data))
	$.ajax({
		type: 'POST',
		url: 'http://127.0.0.1:5000/insert/',
		data: data,
		dataType: 'json',
		success: function() {
			console.log('数据传输成功')
			// showData()
			location.reload()
		},
		error: function() {
			console.log('数据传输失败')
		}
	})
}
// 展示表格的数据
function showData() {
	$.ajax({
		type: 'get',
		url: 'http://127.0.0.1:5000/',
		success: function(data) {
			data = data.data
			console.log(data.length)
			if (data.length == 0) {
				$('<tr id="showRow1">' +
					'<td>' + '<input type="checkbox" id="checkbox1">1' + '</td>' +
					'<td><div contenteditable=\"false\">暂无数据</div></td>' +
					'<td>请输入问题</td>' +
					'<td>请输入问题</td>' +
					'<td>请输入问题</td>' +
					'</tr>').appendTo('#table1')
			} else {
				console.log(data, typeof(data), '123')
				for (var i = 0; i < data.length; i++) {
					id = data[i].id
					question = data[i].question
					description = data[i].description
					makeTime = data[i].makeTime
					modifyTime = data[i].modifyTime
					$('<tr id=\"showRow' + rowNum.toString() + '\"' + 'value=' + id + '>' + '</tr>').appendTo('#table1')
					$('<td class=\"showId\">' +
						'<input type="checkbox" value=\"0\" id=\"checkbox' + rowNum.toString() + '"onclick=checkStatus(' + rowNum +
						')>' +
						rowNum + '</td>' +
						'<td class=\"showQ\"><div contenteditable=\"false\">' + question + '</div></td>' +
						'<td class=\"showD\"><div contenteditable=\"false\">' + description + '</div></td>' +
						'<td class=\"showMakeT\">' + makeTime + '</td>' +
						'<td class=\"showModifyT\">' + modifyTime + '</td>' +
						'<td class=\"showOpreation\">' +
						'<Button onclick=delShowRow(' + rowNum +')>删除</button>' +
						'<Button type="button" onclick=submitData(' + rowNum +')>提交</button>' +
						'</td>').appendTo('#showRow' + rowNum.toString())
					rowNum = rowNum + 1
				}
			}
		},
		error: function() {
			$('<tr id="showRow1">' +
				'<td>' + '<input type="checkbox" id="checkbox1">1' + '</td>' +
				'<td><div id=\"showQ0\" contenteditable=\"false\">请求服务器失败</div></td>' +
				'<td>请输入问题</td>' +
				'<td>xxxx</td>' +
				'<td>xxxx</td>' +
				'<td>xxxx</td>' +
				'</tr>').appendTo('#table1')
		}
	})
}

// 选中为可编辑状态
function checkStatus(rowID) {
	var flag = $('#showRow' + rowID.toString() + ' div')
	var oCheckBox = $('#checkbox' + rowID.toString())
	console.log(flag, '123')
	console.log(flag.length)
	v = oCheckBox.attr('value')
	for (var i = 0; i < flag.length; i++) {
		oDiv = flag[i]
		console.log(oDiv)
		if (v == '0') {
			// $(oCheckBox).attr('value', '1')
			edit(rowID, oDiv)
			console.log('可修改')
		} 
		if(v == '1'){
			// $(oCheckBox).attr('value', '0')
			removeEdit(rowID)
			console.log('不可修改')
		}
		console.log($(oCheckBox).attr('value'))
	}
	if(v == '1'){
		$(oCheckBox).attr('value', '0')
	} else {
		$(oCheckBox).attr('value', '1')
	}
}

$('#edit_btn').bind('click', edit)

function edit(rowID, oDiv) {
	$(oDiv).attr('contenteditable', 'true')
}

function removeEdit(rowID) {
	$('#showRow' + rowID.toString() + ' div').attr('contenteditable', 'false')
}
// 删除指定行
function delShowRow(rowID){
	id = $('#showRow' + rowID.toString()).attr('value')
	console.log('删除', id)
	var data = {'id': id},
	data = JSON.stringify(data)
	$.ajax({
		type: 'POST',
		url: 'http://127.0.0.1:5000/delete/',
		data: data,
		dataType: 'json',
		success: function() {
			console.log('数据传输成功')
			// location.reload()
		},
		error: function() {
			console.log('数据传输失败')
		}
	})
	$('#showRow' + rowID.toString()).remove()
}

// 提交修改的数据到后台
function submitData(rowID){
	// alert('提交数据')
	oRow = $('#showRow' + rowID.toString())
	id = oRow.attr('value')
	var q = oRow.find('.showQ').text()
	var d = oRow.find('.showD').text()
	var data = {'id': id, 'question': q, 'description': d},
	data = JSON.stringify(data)
	console.log('提交', id, data, typeof(data))
	$.ajax({
		type: 'POST',
		url: 'http://127.0.0.1:5000/modify/',
		data: data,
		dataType: 'text',
		success: function() {
			console.log('数据传输成功')
		},
		error: function() {
			console.log('数据传输失败')
		}
	})
}