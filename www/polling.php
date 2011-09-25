<?php
header('Content-type: application/json');

echo $_GET['callback'];
?>
({
	request: {
		userId: 'IUYT',
		date: '2011-10-23T09:32:44'
	},
	response: {
		userId: 'lLLK',
		date: '2011-10-23T11:32:44',
		success: true
	},
	rides: [{
			tripId: 'IUGYUFUHV',
			selected: true,
			start: "Place de la Madeline",
			time:'2011-10-23T11:32:44',
			end:"Bastille"
		}, {
		    tripId: 'AZERT',
			selected: false,
			start: "Aéroport Orly",
			time:'2011-10-23T11:32:44',
			end:"Place d'Italie"
		}
	],
	passenger: {
		userId: 'mjpjmjmjmj',
		latitude: 45.333,
		longitude: 45.333,
		destination: {
			label: "Opera Bastille",
			latitude: 44.333,
			longitude: 4.333
		}
	}
});
 