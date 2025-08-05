<?php

declare(strict_types=1);

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
        Schema::create('devices', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('type');
            $table->foreignId('vehicle_id')->nullable()->constrained('trucks');
            $table->string('sim_number')->nullable();
            $table->string('imei')->unique()->nullable();
            $table->enum('status', ['active', 'inactive', 'maintenance', 'retired'])->default('active');
            $table->timestamp('last_communication_at')->nullable();
            $table->timestamp('installed_at')->nullable();
            $table->string('firmware_version')->nullable();
            $table->string('ip_address')->nullable();
            $table->string('location')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('devices');
    }
};
