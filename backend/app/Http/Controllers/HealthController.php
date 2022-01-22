<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\UserActivity;

class HealthController extends Controller
{
    public function index()
    {
        $lastHourCount = UserActivity::whereRaw('created_at > DATE_SUB(NOW(), INTERVAL 1 HOUR)')->count();
        $last15MinutesCount = UserActivity::whereRaw('created_at > DATE_SUB(NOW(), INTERVAL 15 MINUTE)')->count();
        $last24HoursCount = UserActivity::whereRaw('created_at > DATE_SUB(NOW(), INTERVAL 24 HOUR)')->count();

        return response()->json([
            'status' => 'OK',
            'time' => date('c'),
            'timestamp' => time(),
            'metrics' => [
                'logins' => [
                    'last_hour' => $lastHourCount,
                    'last_15_mnutes' => $last15MinutesCount,
                    'last_24_hours' => $last24HoursCount,
                ],
            ],
        ]);
    }
}
