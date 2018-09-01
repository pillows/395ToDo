$( document ).ready(function() {
  let successData = (data) =>{
    console.log(data);


    const uuid = data.uuid;
    const rowTemplate = `

    <tr>
    <td>
      <div class="centered">
        <input type="checkbox"/>
      </div>

    </td>

      <td id="`+uuid+`"></td>
      <td class="centered">

        open
      </td>
      <td><div class="delete centered">
        <button>x</button>
      </div><input type="hidden" value="`+ uuid +`" /></td>

    </tr>


    `

    $("#todoList").append(rowTemplate);
    const todoItem = $("#addItem").val();
    $("#"+uuid).text(todoItem);
    $("#addItem").val("");

  };

    $("#submitItem").on("click",function(){
      const todoItem = $("#addItem").val();
      const data = {
        "description":todoItem
      }

      // The POST request will send the todo item to the add api
      // In return we get the uuid that is correspondent to the item
        $.ajax({
      url: '/api/add',
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      success:successData,

    });
    });


    $("input[type='checkbox']").on("change", function(){
      // NEVER EVER DO THIS. I think.
      // This is parent and child hell
      const currentStatus = $(this).parent().parent().next().next();
      const uuid = $(this).parent().parent().next().next().next()[0].children[1].value;
      const data = {
        "uuid":uuid,
        "status":"done"
      }

      $.ajax({
        url: '/api/status',
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success:function(data){
          console.log(data);
          currentStatus.text(data.message)
        },
      });
    })

    $(".deleteButton").on("click", function(){
      const uuid = $(this).parent().parent().children()[1].value;
      const parentEl = $(this).parent().parent().parent();
      const data = {
        "uuid":uuid,
        "status":"delete"
      }
      $.ajax({
        url: '/api/status',
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success:function(data){
          parentEl.remove();
          console.log(data);
        },
      });
    });
});
