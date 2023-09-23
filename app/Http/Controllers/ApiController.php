<?php

namespace App\Http\Controllers;

use App\Models\DetailTabungan;
use App\Models\TabunganTarget;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function index(Request $request)
    {
        $tabungan = TabunganTarget::findOrFail($request->tabungan_target_id);
        $detail = DetailTabungan::findOrFail($request->id);
        $detail->update([
            'status_masuk' => 'uang sudah masuk',
        ]);
        if (($tabungan->tabungan_terkumpul + $detail->jumlah) >= $tabungan->target_tabungan) {
            $tabungan->update([
                'tabungan_terkumpul' => $tabungan->tabungan_terkumpul + $detail->jumlah,
                'tanggal_tercapai' => now()->format('Y-m-d H:i:s'),
                'status_tabungan' => 'tercapai',
            ]);
            dd($tabungan);
        } else {
            $tabungan->update([
                'tabungan_terkumpul' => $tabungan->tabungan_terkumpul + $detail->jumlah,
            ]);
        }
    }
}