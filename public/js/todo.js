$( document ).ready(function() {
  let successData = (data) =>{
    console.log(data);


    const uuid = data.uuid;
    const rowTemplate = `

    <tr>
    <td>
      <div class="centered">
        <input class="checkbox" id="`+ uuid +`-checkbox" type="checkbox"/>
      </div>

    </td>

      <td id="`+uuid+`"></td>
      <td class="centered">

        open
      </td>
      <td><div class="delete centered">
        <button class="deleteButton">x</button>
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

    $(document).on("ready",function(){
      
    });
    $(document).on("change","[id$=checkbox]", function(){
      const uuidEl = "#" + $(this)[0].id;
      // NEVER EVER DO THIS. I think.
      // This is parent and child hell
      let currentStatus = $(this).parent().parent().next().next()[0].innerText;
      if(currentStatus == "open"){
        currentStatus = "done";
      }
      else if(currentStatus == "done"){
        currentStatus = "open"
      }
      const uuid = $(this).parent().parent().next().next().next()[0].children[1].value;
      const data = {
        "uuid":uuid,
        "status":currentStatus
      }

      $.ajax({
        url: '/api/status',
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success:function(data){
          console.log(data);
          if(data.message == "open"){
            $(uuidEl).parent().parent().next().removeClass("done")
          }
          else{
            $(uuidEl).parent().parent().next().addClass("done")
          }
          $(uuidEl).parent().parent().next().next()[0].innerText = data.message;

        },
      });
    })

    $(document).on("click",".deleteButton", function(){
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
