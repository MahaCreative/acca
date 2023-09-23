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
        Schema::create('tabungan_targets', function (Blueprint $table) {
            $table->id();
            $table->string('tabungan_untuk');
            $table->string('foto_tabungan');
            $table->integer('target_tabungan');
            $table->integer('tabungan_terkumpul')->default(0);
            $table->datetime('tanggal_mulai');
            $table->datetime('tanggal_tercapai')->nullable();
            $table->string('status_tabungan')->default('belum tercapai');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tabungan_targets');
    }
};
