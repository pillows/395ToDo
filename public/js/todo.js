$( document ).ready(function() {
    $("#submitItem").on("click",function(){
      const todoItem = encodeURIComponent($("#addItem").val());
      const uuid = " fake uuid 94e7ee84-b1d2-46a9-a9e3-eefa3d8be441";
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
        </div><input type="hidden" value="{{{ username }}}!{{{ @index }}}" /></td>

      </tr>


      `
      $("#addItem").val("");
      $("#todoList").append(rowTemplate);

      const data = {
        "description":todoItem
      }

      $.ajax({
    url: '/api/add',
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",

},function(data){

});
      console.log("click");
    });
});
