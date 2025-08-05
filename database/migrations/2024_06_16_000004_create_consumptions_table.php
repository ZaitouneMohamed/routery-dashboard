<?php

declare(strict_types=1);
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('consumptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('driver_id')->constrained('drivers')->onDelete('cascade');
            $table->foreignId('truck_id')->constrained('trucks')->onDelete('cascade');
            $table->date('date');
            $table->text('description')->nullable();
            $table->string('status')->nullable();
            $table->string('city')->nullable();
            $table->float('km_proposer')->nullable();
            $table->string('n_magasin')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('consumptions');
    }
};
