<?php

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('get-data', [ApiController::class, 'index']);
Route::post('belum-masuk', [ApiController::class, 'belumMasuk']);
Route::get('get-target', [ApiController::class, 'getTarget'])->name('getTarget');
