<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserActivity extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    protected $table = 'user_activity';

    const LOGIN_TYPE = 'login';

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}
