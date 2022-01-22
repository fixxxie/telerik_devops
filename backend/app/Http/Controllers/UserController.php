<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;

class UserController extends Controller
{
    public function activity(User $user)
    {
        if ($user->id != auth()->user()->id) {
            return response()->json(['activity' => []]);
        }

        return response()->json(['activity' => $user->activity]);
    }
}
