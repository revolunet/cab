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
	cabs: [
		{
			userId: 'IUGYUFUHV',
			selected: true,
			start: {
				name:"Place de la Madeline",
				time:'2011-10-23T11:32:44'
			},
			end: {
				name:"Bastille"
			}
		},
		{
			userId: 'AZERT',
			selected: false,
			start: {
				name:"Aéroport Orly",
				time:'2011-10-23T11:32:44'
			},
			end: {
				name:"Place d'Italie"
			}
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
 