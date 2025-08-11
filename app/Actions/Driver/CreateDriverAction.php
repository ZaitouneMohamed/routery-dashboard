<?php

declare(strict_types=1);

namespace App\Actions\Driver;

use App\Models\Driver;
use App\Models\Image;

final class CreateDriverAction
{
    public function handle(array $data)
    {
        // Create the driver
        $driver = Driver::create([
            'full_name' => $data['full_name'],
            'phone' => $data['phone'],
            'code' => $data['code'],
            // 'numero_2' => $data['numero_2'],
            // 'adresse' => $data['adresse'],
            'cnss' => $data['cnss'],
            'email' => $data['email'],
            'cni' => $data['cni'],
        ]);

        if (isset($data['image']) && $data['image']->isValid()) {
            $file = $data['image'];
            $filename = \uniqid('driver_').'.'.$file->getClientOriginalExtension(); // safer
            $path = $file->storeAs('drivers', $filename, 'public'); // handles path correctly

            // Save image relation
            $image = new Image([
                'url' => $path,
            ]);

            $driver->image()->save($image);
        }

        return $driver;
    }
}
