<?php

/**
 * Description of Security
 *
 * @author Peter Meth
 */
class Security {
	protected $_db;
	protected $_usertable;

	function __construct($db, $usertable = 'user') {
		$this->_db = $db;
		$this->_usertable = $usertable;
	}

	public function checkUsernameAndPasswordHash($username, $passwordhash) {
		$stmt = $this->_db->prepare('SELECT * FROM ' . $this->_usertable . ' WHERE is_active="true" AND username=:username AND password=:passwordhash');
		$stmt->execute(array(':username' => $username, ':passwordhash' => $passwordhash));
		$user = $stmt->fetchAll();
		return count($user) == 1;
	}

	public function getUserIdFromUsername($username) {
		$stmt = $this->_db->prepare('SELECT id FROM ' . $this->_usertable . ' WHERE is_active="true" AND username=:username');
		$stmt->execute(array(':username' => $username));
		$user = $stmt->fetchObject();
		return $user->id;
	}

	public function registerUser($username, $passwordhash) {
        try {
            $stmt = $this->_db->prepare('INSERT INTO ' . $this->_usertable . ' SET username=:username, password=:passwordhash');
            $stmt->execute(array(':username' => $username, ':passwordhash' => $passwordhash));
        }
        catch (PDOException $e) {
            throw $e->errorInfo[1] == 1062 ? new Exception("The user id '$username' is not available.") : $e;
        }
		return true;
	}

	public function isValidUsername($username) {
		$username = trim($username);
		if(strlen($username) < 3) {
			return false;
		}

        //Removed SELECT from user table in favour of unique index in db.
        //Cleaner and avoids race condition.
        //Except that now if a duplicate user ID is added after first being deactivated then, then
        //deactivating again will cause a constraint violation.  Maybe not so clean - but I'd prefer
        //to revisit the use of is_active to the SELECT approach.  Doesn't appear to be a way to
        //deactivate yet anyway.

		return true;

	}

	public function isValidPassword($password) {
		if(strlen($password) < 6) {
			return false;
		}

		return true;
	}

	static function getHash($original, $salt) {
		$tempstring = str_rot13($original) . str_repeat($salt, 3) . 'ab2336';
		return hash('sha256', $tempstring);
	}
}

