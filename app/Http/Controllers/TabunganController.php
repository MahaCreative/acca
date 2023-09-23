<?php

namespace App\Http\Controllers;

use App\Models\Penarikan;
use App\Models\TabunganTarget;
use Illuminate\Http\Request;
use PhpMqtt\Client\Facades\MQTT;

class TabunganController extends Controller
{
    public function index(Request $request)
    {

        return inertia('Tabungan/Tabungan');
    }

    public function show(Request $request, $id)
    {
        $tabungan = TabunganTarget::with('detailTabungan', 'penarikan')->findOrFail($id);

        return inertia('Tabungan/Show', compact('tabungan'));
    }
    public function store(Request $request)
    {

        $request->validate([
            'nama_tabungan' => 'required',
            'jumlah_tabungan' => 'required',
            'foto' => 'required|mimes:png,jpg, jpeg',
        ]);
        $url = $request->file('foto')->store('foto');
        $tabungan = TabunganTarget::create([
            'tabungan_untuk' => $request->nama_tabungan,
            'foto_tabungan' => $url,
            'target_tabungan' => $request->jumlah_tabungan,
            'tanggal_mulai' => now(),
        ]);
        return redirect()->route('dashboard');
    }

    public function update(Request $request)
    {
    }

    public function delete(Request $request, $id)
    {
        $tabungan = TabunganTarget::findOrFail($id);
        $tabungan->delete();
        return redirect()->route('dashboard');
    }

    public function handlerSaldo(Request $request)
    {

        $tabungan = TabunganTarget::findOrFail($request->tabungan_id);
        if ($request->status == 'tambah') {
            $request->validate([
                'nominal' => 'required|numeric|min:1000',
            ]);
            $detail = $tabungan->detailTabungan()->create([
                'jumlah' => $request->nominal,
                'waktu_menabung' => now()->format('Y-m-d H:i:s'),
                'keterangan' => $request->keterangan,
                'status_masuk' => 'uang belum masuk',
            ]);


            MQTT::publish('tambah_tabungan', $detail);
            // Pindahkan ini ke methode api

        } else {
            $request->validate([
                'nominal' => 'required|numeric|min:1000|max:' . $tabungan->target_tabungan,
            ]);

            if (($tabungan->tabungan_terkumpul - $request->jumlah) < 0) {
                return redirect()->back();
            } else {
                $tarik = Penarikan::create([
                    'tabungan_target_id' => $tabungan->id,
                    'jumlah' => $request->nominal,
                    'waktu_menarik' => now()->format('Y-m-d H:i:s'),
                    'keterangan' => $request->keterangan,
                ]);
                $tabungan->update([
                    'tabungan_terkumpul' => $tabungan->tabungan_terkumpul - $tarik->jumlah
                ]);
            }
        }
    }

    public function showTercapai($id)
    {
        $tabungan = TabunganTarget::with('detailTabungan', 'penarikan')->findOrFail($id);

        return inertia('Tabungan/ShowSelesai', compact('tabungan'));
    }
}
