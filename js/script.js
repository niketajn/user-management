	

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
			 	tr.append(tdzero);

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

			 	var edit = $('<span class="fa fa-pencil fa-lg fa-fw" title="Edit"></span>');
			 	edit.click(editUserEvent);
			 	td5.append(edit);

			 	var deleteU = $('<span class="fa fa-trash-o fa-lg fa-fw" title="Delete"></span>');
			 	deleteU.click(deleteUserEvent);
			 	td5.append(deleteU);
			 	tr.append(td5);

			 	$("#table-content").append(tr);

			 	$('#users-data #users-table').show();
			 	$('#form-data-users #myForm').hide();


			 });
		}
    var usersList = [];
    var editMode = false;
    var obj;
    $('#myForm').submit(function(e){
        e.preventDefault();
        if (editMode == true){
		        saveUser();
		        editMode = false;
		        refreshList(usersList);
        }else{

		        obj = {
		          _id: guidGenerator(),
		          name: $("input[name=user-name]").val(),
		          address: $("textarea[name=address]").val(),
		          phoneNumber: $("input[name=phnum]").val(),
		          email: $("input[name=email]").val(),
		        }
			        usersList.push(obj);

			         //clear form values
			        $("input[name=user-name]").val('');
			        $("textarea[name=address]").val('');
			        $("input[name=phnum]").val('');
			        $("input[name=email]").val('');
			        refreshList(usersList);

       		}
    });

    function deleteUserEvent(event){
			if (confirm("Are you sure?")) {     	
				var button = $(event.target);  //which button is clicked
		    	var tr = button.parent().parent()
		    	var randomID = tr.find('.userId').html(); //find inside tr children
		    	deleteUser(randomID);
		    }
    }

    function editUserEvent(event){
    			var button = $(event.target);//which button is clicked
    			editMode = true;
		    	var tr = button.parent().parent()
		    	var randomID = tr.find('.userId').html();
		    	editUser(randomID);
    }

    

    function guidGenerator() {
	    var S4 = function() {
	       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	    };
	    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	}

	function deleteUser(randomID){
		$.each(usersList,function(i,v){
			if (randomID == v._id ){
				usersList.splice(i,1);
				refreshList(usersList);
			}
		});
	}

	function editUser(randomID){
		$.each(usersList,function(index,value){
			if (randomID == value._id ){
				
				$("input[name=randomId]").val(randomID);
				$("input[name=user-name]").val(value.name);
          		$("textarea[name=address]").val(value.address);
           		$("input[name=phnum]").val(value.phoneNumber);
           		$("input[name=email]").val(value.email);	
			 	$('#users-data #users-table').hide();
			 	$('#form-data-users #myForm').show();           		
			}
		});
	}


	function saveUser(){
		$.each(usersList,function(index,value){
			
			if (($("input[name=randomId]").val()) == value._id){

				 obj = {
			          _id: value._id,
			          name: $("input[name=user-name]").val(),
			          address: $("textarea[name=address]").val(),
			          phoneNumber: $("input[name=phnum]").val(),
			          email: $("input[name=email]").val(),
       				 }
       				 usersList[index]=obj;	 
			}
		});
	}
//document ready    
});
