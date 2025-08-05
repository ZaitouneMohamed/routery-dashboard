<?php

declare(strict_types=1);
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('consumption_id')->constrained('consumptions')->onDelete('cascade');
            $table->date('date');
            $table->float('qte_litre');
            $table->text('description')->nullable();
            $table->float('prix');
            $table->foreignId('station_id')->constrained('stations')->onDelete('cascade');
            $table->string('numero_bon');
            $table->float('km');
            $table->string('nature');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bons');
    }
};
