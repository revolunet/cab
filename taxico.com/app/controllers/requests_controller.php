<?php
class RequestsController extends AppController {
	//var $helpers = array ('Html','Form');
	var $name = 'Requests';

	function index() {
		$this->set('requests', $this->Request->find('all'));
	}
}
?>