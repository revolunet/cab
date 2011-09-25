<?php
class TripsController extends AppController {
	//var $helpers = array ('Html','Form');
	var $name = 'Trips';

	function index() {
		$this->set('trips', $this->Trip->find('all'));
	}
}
?>