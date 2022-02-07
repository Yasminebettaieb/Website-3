function initMap() {
    var input = document.getElementById('PickupLocationInput');
    var input1 = document.getElementById('DropoffLocationInput');
    var autocomplete = new google.maps.places.Autocomplete(input);
    var autocomplete1 = new google.maps.places.Autocomplete(input1);
    google.maps.event.addListener(autocomplete, 'place_changed' ,  function() {
     locationChangeHandler(autocomplete,autocomplete1);
     PriceCalculator();
    }
    );
    google.maps.event.addListener(autocomplete1, 'place_changed' ,  function() {
        locationChangeHandler(autocomplete,autocomplete1);
        PriceCalculator();
       }
       );


}


initMap();
function locationChangeHandler(autoc,autoc1){

        var place = autoc.getPlace();
        var place1 = autoc1.getPlace();
        if(place && place1){
        console.log(place.name);
        console.log(place.geometry.location.lat());
        console.log(place.geometry.location.lng());
    
        console.log(place1.name);
        console.log(place1.geometry.location.lat());
        console.log(place1.geometry.location.lng());

        var distance = google.maps.geometry.spherical.computeDistanceBetween(place.geometry.location, place1.geometry.location);       
        console.log(distance);
        console.log(distance/1000);
        document.getElementById('Kilometrage').value=(distance/1000).toFixed(3);
    }
        
   
}
(function($){
    
    
    
 $("#from-date-picker").datetimepicker({
        
        controlType: 'select',
        oneLine: true,
        timeFormat: 'HH:mm',
        onClose: function(dateText) {
            PriceCalculator();
        },
        
        
        
    });
    $.datepicker.regional['fr'] = {clearText: 'Effacer', clearStatus: '',
    closeText: 'Fermer', closeStatus: 'Fermer sans modifier',
    prevText: '<Préc', prevStatus: 'Voir le mois précédent',
    nextText: 'Suiv>', nextStatus: 'Voir le mois suivant',
    currentText: 'Courant', currentStatus: 'Voir le mois courant',
    monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin',
    'Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
    monthNamesShort: ['Jan','Fév','Mar','Avr','Mai','Jun',
    'Jul','Aoû','Sep','Oct','Nov','Déc'],
    
    monthStatus: 'Voir un autre mois', yearStatus: 'Voir un autre année',
    weekHeader: 'Sm', weekStatus: '',
    dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
    dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
    dayNamesMin: ['Di','Lu','Ma','Me','Je','Ve','Sa'],
    dayStatus: 'Utiliser DD comme premier jour de la semaine', dateStatus: 'Choisir le DD, MM d',
    dateFormat: 'dd/mm/yy', firstDay: 0, 
    initStatus: 'Choisir la date', isRTL: false, currentText:"Maintenant",
    closeText:"Done",amNames:["AM","A"],pmNames:["PM","P"],timeFormat:"HH:mm",
    timeSuffix:"",timeOnlyTitle:"Choose Time",timeText:"Time",hourText:"Hour",minuteText:"Minute",
    secondText:"Second",millisecText:"Millisecond",microsecText:"Microsecond",timezoneText:"Time Zone"};
 $.datepicker.setDefaults($.datepicker.regional['fr']);

 

})(jQuery);

function PriceCalculator (){
    let dateText= document.getElementById('from-date-picker').value;
    
    let kilometrage=document.getElementById('Kilometrage').value;
        if(kilometrage==="" || dateText==="")
        {return ;};
    kilometrage=parseFloat(kilometrage);
    let d=new Date(dateText);
		
		let price=6.60;
       
		
         console.log(d.getDay());
		if(d.getHours()>=6 && d.getHours()<20 && d.getDay()!=0)
		{       
				price=price+(kilometrage*3.20);}
	   
        else
        {
            price=price+(kilometrage*4.00);
        }
		
		document.getElementById('Price').value=(Math.ceil(price*10)/10).toFixed(2);
}
