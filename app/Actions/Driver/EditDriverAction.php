<?php

declare(strict_types=1);

namespace App\Actions\Driver;

use App\Models\Driver;
use App\Models\Image;
use Illuminate\Support\Facades\Storage;

final class EditDriverAction
{
    public function handle(array $data, int|string $id): Driver
    {
        $driver = Driver::findOrFail($id);

        $driver->update([
            'full_name' => $data['full_name'],
            'phone' => $data['phone'],
            'code' => $data['code'],
            'cnss' => $data['cnss'],
            'email' => $data['email'],
            'cni' => $data['cni'],
        ]);

        if (isset($data['image']) && $data['image']->isValid()) {
            $file = $data['image'];
            $filename = \uniqid('driver_').'.'.$file->getClientOriginalExtension();
            $path = $file->storeAs('drivers', $filename, 'public');

            if ($driver->image) {
                Storage::disk('public')->delete($driver->image->url);
                $driver->image->delete();
            }

            $image = new Image([
                'url' => $path,
            ]);

            $driver->image()->save($image);
        }

        return $driver;
    }
}
