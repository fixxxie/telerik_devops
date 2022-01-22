<?php

namespace App;

use Illuminate\Auth\Events\Login;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

use App\Models\UserActivity;

/**
 * Records login activity
 *
 * @property integer $id
 */
class LoginNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \Illuminate\Auth\Events\Login $event
     * @return void
     */
    public function handle(Login $event)
    {
        UserActivity::create(['user_id' => $event->user->id, 'type' => UserActivity::LOGIN_TYPE]);
    }
}
