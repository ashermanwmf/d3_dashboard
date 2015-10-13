function getdata() {
var my_data = '';
    
$.getJSON('dashboard/includes/data/data.json', function(data) {
    console.log(data);
    my_data = JSON.parse(data); 
});
    
    $.ajax({
        url: 'dashboard/includes/data/data.json',
        type: 'GET',
        success: function(data) {
            console.log(data);   
        }
    });

console.log(my_data);

return document.getElementById("demo").innerHTML = 
        my_data.name + "<br>" +
        my_data.street + "<br>" +
        my_data.phone;
    
}

