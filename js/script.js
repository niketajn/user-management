	

	 $(document).ready(function(){
	 	 
		 	$('#users-data #users-table').hide();
		 	$('#form-data-users #myForm').hide();

		 	$('#users-data #show-users').click(function(e){
		 		$('#users-data #users-table').show();
		 		$('#form-data-users #myForm').hide();
		 	});

		 	$('#users-data #add-users').click(function(){
		 		$('#form-data-users #myForm').show();
		 		$('#users-data #users-table').hide();
		 	});

		function refreshList(usersList){
			$('#table-content').empty();
			 

			 $.each(usersList,function(index,value){
			 	var tr = $("<tr></tr>");

			 	var tdzero = $("<td></td>");
			 	tdzero.addClass('userId');
			 	tdzero.css('display','none');
			 	tdzero.html(value._id);
			 	tr.append(tdzero)

			 	var td1 = $("<td></td>");
			 	td1.html(value.name);
			 	tr.append(td1);

			 	
			 	var td2 = $("<td></td>");
			 	td2.html(value.address);
			 	tr.append(td2);

			 	
			 	var td3 = $("<td></td>");
			 	td3.html(value.email);
			 	tr.append(td3);

			 
			 	var td4 = $("<td></td>");
			 	td4.html(value.phoneNumber);
			 	tr.append(td4);

			 	var td5 = $("<td></td>");
			 	td5.html('<button class="btn btn-danger btn-xs deleteBtn">DELETE</button>');
			 	
			 	td5.click(deleteUser) //tell jquery to call deleteU function when user performs 'click'
			 	tr.append(td5);

			 	$("#table-content").append(tr);

			 	$('#users-data #users-table').show();
			 	$('#form-data-users #myForm').hide();


			 });
		}
    var usersList = [];
    $('#myForm').submit(function(e){
        e.preventDefault();
        var obj = {
          _id: guidGenerator(),
          name: $("input[name=user-name]").val(),
          address: $("input[name=address]").val(),
          phoneNumber: $("input[name=phnum]").val(),
          email: $("input[name=email]").val(),
        }
        usersList.push(obj);
        refreshList(usersList);
    });

    function deleteUser(event){
    	var button = $(event.target);  //which button is clicked
    	var tr = button.parent().parent()


    	var randomID = tr.find('.userId').html(); //find inside tr children
    	console.log(randomID);
    }

    

    function guidGenerator() {
	    var S4 = function() {
	       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	    };
	    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	}

//document ready    
});
