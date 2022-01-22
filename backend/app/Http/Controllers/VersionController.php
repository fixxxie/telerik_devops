<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VersionController extends Controller
{
    public function index()
    {
        $version = file_get_contents(base_path('VERSION'));

        return response()->json([
            'status' => true,
            'version' => $version,
        ]);
    }
}
