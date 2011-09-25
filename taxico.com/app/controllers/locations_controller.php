<?php
class LocationsController extends AppController {
	//var $helpers = array ('Html','Form');
	var $name = 'Locations';

	function index() {
		$this->set('locations', $this->Location->find('all'));
	}
}
?>