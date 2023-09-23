<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TabunganTarget extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function detailTabungan()
    {
        return $this->hasMany(DetailTabungan::class);
    }

    public function penarikan()
    {
        return $this->hasMany(Penarikan::class);
    }
}
