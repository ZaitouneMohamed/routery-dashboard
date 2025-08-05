<?php

declare(strict_types=1);

use App\Models\Driver;
use App\Models\User;

\test('driver route for non authenticated users', function () {
    $response = $this->get('/dashboard/drivers');
    $response->assertRedirect('/login');
});

\test('driver route for authenticated users', function () {
    $this->actingAs(User::first());
    $response = $this->get('/dashboard/drivers');
    $response->assertStatus(200);
});

\test('non authenticated users cannot access create driver page', function () {
    $response = $this->get('/dashboard/drivers/create');
    $response->assertRedirect('/login');
});

\test('authenticated users can access create driver page', function () {
    $this->actingAs(User::first());
    $response = $this->get('/dashboard/drivers/create');
    $response->assertStatus(200);
});

\test('non authenticated users cannot access edit driver page', function () {
    $response = $this->get('/dashboard/drivers/1/edit');
    $response->assertRedirect('/login');
});

\test('authenticated users can access edit driver page', function () {
    $firstDriver = Driver::first();
    $this->actingAs(User::first());
    $response = $this->get("/dashboard/drivers/{$firstDriver->id}/edit");
    $response->assertStatus(200);
});
