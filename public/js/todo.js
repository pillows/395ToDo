$( document ).ready(function() {
  let successData = (data) =>{
    console.log(data);
    const todoItem = encodeURIComponent($("#addItem").val());

    const uuid = data.uuid;
    const rowTemplate = `

    <tr>
    <td>
      <div class="centered">
        <input type="checkbox" checked="true"/>
      </div>

    </td>

      <td>`+todoItem+`</td>
      <td class="centered">

        open
      </td>
      <td><div class="delete centered">
        <button>x</button>
      </div><input type="hidden" value="`+ uuid +`" /></td>

    </tr>


    `
    $("#addItem").val("");
    $("#todoList").append(rowTemplate);
  };

    $("#submitItem").on("click",function(){
      const todoItem = encodeURIComponent($("#addItem").val());
      const data = {
        "description":todoItem
      }
      $.ajax({
    url: '/api/add',
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
    success:successData,

    })






      console.log("click");
    });
});
