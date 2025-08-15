<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;

class NotifiableUser
{
    use Notifiable;

    public $email;
    public $name;

    public function __construct($email, $name = '')
    {
        $this->email = $email;
        $this->name = $name;
    }
}
