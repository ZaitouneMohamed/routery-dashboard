<?php

declare(strict_types=1);
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('papiers', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->date('date_debut');
            $table->date('date_fin');
            $table->text('description')->nullable();
            $table->foreignId('truck_id')->constrained('trucks')->onDelete('cascade');
            $table->integer('days_count');
            $table->date('last_notification')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('papiers');
    }
};
