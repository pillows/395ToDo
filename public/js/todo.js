$( document ).ready(function() {
    $("#submitItem").on("click",function(){
      const todoItem = $("#addItem").val();
      const uuid = "94e7ee84-b1d2-46a9-a9e3-eefa3d8be441";
      const rowTemplate = `

      <tr>

        <td>`+todoItem+`</td>
        <td>

          Open
        </td>
        <td><input type="hidden" value="`+uuid+`" /></td>

        <td>

          <select name="status">
            <option>-</option>
            <option>Open</option>
            <option>Done</option>
            <option>Remove</option>
          </select>
        </td>
      </tr>


      `
      $("#addItem").val("");
      $("#todoList").append(rowTemplate);
      console.log("click");
    });
});
