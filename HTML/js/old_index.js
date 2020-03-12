function getData() {
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1/",
        success: function (data) {
            console.log('data', data, typeof(data));
            console.log(data.length);
            for (var i = 0; i < data.length; i++) {
                var row_data = data[i];
                row_id = 'col'.concat(i + "");
                console.log('123', row_id);
                $("<tr id=" + row_id + "></tr>").appendTo("#TableInfo");
                $("<td class='id'><div contenteditable=\"false\">" + row_data.id + "</div></td>").appendTo('#' + row_id);
                $("<td class='question'><div class='revisability' contenteditable=\"false\">" + row_data.question + "</div></td>").appendTo('#' + row_id);
                $("<td class='description'><div class='revisability' >" + row_data.description + "</div></td>").appendTo('#' + row_id);
                $("<td class='makeTime'><div class='revisability' contenteditable=\"true\">" + row_data.makeTime + "</div></td>").appendTo('#' + row_id);
                $("<td class='modifiTime'><div class='revisability' contenteditable=\"true\">" + row_data.modifyTime + "</div></td>").appendTo('#' + row_id);
                $("<td align='center'><button onclick= deleteRow(" + row_id + ")>删除</button></button></td>").appendTo('#' + row_id)
            }

        }
    })
}

getData();
//添加修改按钮的点击事件
$('#edit').bind('click', function () {
    alert('123');
    $('.revisability').attr("contenteditable", "ture")
});

$('#add_btn').bind('click', function(){
	alert('123')
})

function insertNewRow(row) {
	

}

function deleteRow(row) {
    console.log('row', row.id)
    $('#'+row.id).remove();
    alert('删除', row.id)
}

