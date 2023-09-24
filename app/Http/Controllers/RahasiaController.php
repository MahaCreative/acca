<?php

namespace App\Http\Controllers;

use App\Models\TabunganTarget;
use Illuminate\Http\Request;
use PhpMqtt\Client\Facades\MQTT;

class RahasiaController extends Controller
{
    public function index(Request $request)
    {
        return inertia('Rahasia');
    }

    public function store(Request $request)
    {
        $tabungan = TabunganTarget::where('status_tabungan', 'belum tercapai')->latest()->first();
        if ($tabungan) {
            MQTT::publish('rahasia', $request->data);
            $detail = $tabungan->detailTabungan()->create([
                'jumlah' => $request->data,
                'waktu_menabung' => now()->format('Y-m-d H:i:s'),
                'keterangan' => '',
                'jenis_tabungan' => 'Manual',
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
        } else {
            MQTT::publish('gagalTabungManual', $request->data);
        }
    }
}
