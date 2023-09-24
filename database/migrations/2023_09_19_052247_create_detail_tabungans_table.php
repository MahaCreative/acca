<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('detail_tabungans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tabungan_target_id')->references('id')->on('tabungan_targets')->onUpdate('cascade')->onDelete('cascade');
            $table->integer('jumlah');
            $table->dateTime('waktu_menabung');
            $table->string('keterangan')->nullable();
            $table->string('jenis_tabungan')->default('android');
            $table->string('status_masuk')->default('uang belum masuk');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_tabungans');
    }
};
