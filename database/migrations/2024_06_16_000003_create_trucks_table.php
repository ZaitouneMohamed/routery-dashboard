<?php

declare(strict_types=1);
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('trucks', function (Blueprint $table) {
            $table->id();
            $table->string('matricule');
            $table->boolean('statue')->default(1);
            $table->boolean('is_for_aej')->default(0);
            $table->string('marque');
            $table->string('genre');
            $table->string('type_carburant');
            $table->string('n_chasie');
            $table->string('puissanse_fiscale');
            $table->date('premier_mise')->nullable();
            $table->float('consommation')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('trucks');
    }
};
