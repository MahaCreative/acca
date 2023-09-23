<?php

namespace App\Http\Controllers;

use App\Models\TabunganTarget;
use Illuminate\Http\Request;

class DashboarController extends Controller
{
    public function index(Request $request)
    {
        $tabungan = TabunganTarget::with('detailTabungan')->where('status_tabungan', 'belum tercapai')->latest()->first();
        $tabunganTercapai = TabunganTarget::with('detailTabungan')->where('status_tabungan', 'tercapai')->latest()->get();

        return inertia('Dashboard', compact('tabungan', 'tabunganTercapai'));
    }
}
