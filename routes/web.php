<?php

use App\Http\Controllers\DashboarController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RahasiaController;
use App\Http\Controllers\SplashScreen;
use App\Http\Controllers\TabunganController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('', [SplashScreen::class, 'index'])->middleware(['guest'])->name('index');
Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', [DashboarController::class, 'index'])->name('dashboard');
    Route::get('tabungan', [TabunganController::class, 'index'])->name('tabungan');
    Route::post('tabungan', [TabunganController::class, 'store']);
    Route::get('show-tabungan/{id}', [TabunganController::class, 'show'])->name('show.tabungan');
    Route::post('handler-saldo', [TabunganController::class, 'handlerSaldo'])->name('handlerSaldo');
    Route::get('delete-tabungan/{id}', [TabunganController::class, 'delete'])->name('delete');
    Route::get('show-selesai/{id}', [TabunganController::class, 'showTercapai'])->name('showTercapai');
    Route::delete('delete_tabungan', [TabunganController::class, 'delete_detail'])->name('delete_detail');
});
Route::get('rahasia', [RahasiaController::class, 'index'])->name('rahasia');
Route::post('rahasia', [RahasiaController::class, 'store']);
Route::post('login', [LoginController::class, 'store'])->name('login');
