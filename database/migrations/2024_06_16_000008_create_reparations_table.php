<?php

declare(strict_types=1);
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reparations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('driver_id')->constrained('drivers')->onDelete('cascade');
            $table->foreignId('truck_id')->constrained('trucks')->onDelete('cascade');
            $table->date('date');
            $table->string('fournisseur');
            $table->string('reparation');
            $table->float('prix');
            $table->string('nature');
            $table->string('type');
            $table->string('n_bon');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reparations');
    }
};
