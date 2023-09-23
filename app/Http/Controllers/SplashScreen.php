<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SplashScreen extends Controller
{
    public function index(Request $request)
    {
        return inertia('Index');
    }
}
