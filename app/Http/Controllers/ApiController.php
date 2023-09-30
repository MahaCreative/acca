<?php

namespace App\Http\Controllers;

use App\Events\TabunganEvents;
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
        } else {
            $tabungan->update([
                'tabungan_terkumpul' => $tabungan->tabungan_terkumpul + $detail->jumlah,
            ]);
        }

        broadcast(new TabunganEvents())->toOthers();
    }

    public function belumMasuk(Request $request)
    {

        $tabungan = TabunganTarget::findOrFail($request->tabungan_target_id);
        $detail = DetailTabungan::findOrFail($request->id);
        $detail->update([
            'status_masuk' => 'uang belum masuk',
        ]);
        broadcast(new TabunganEvents())->toOthers();
    }

    public function getTarget(Request $request)
    {
        $tabungan = TabunganTarget::where('status_tabungan', 'belum tercapai')->latest()->first();
        broadcast(new TabunganEvents())->toOthers();
        return $tabungan;
    }
}
