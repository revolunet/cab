<?php
class UsersController extends AppController {
	
	var $name = 'Users';

	function index() {
		$this->set('users', $this->User->find('all'));
	}
}
?>