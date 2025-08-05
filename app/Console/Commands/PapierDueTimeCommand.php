<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Papier;
use App\Models\User;
use App\Notifications\PapierDueNotification;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Notification;

final class PapierDueTimeCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:papier-due-time-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    public function handle()
    {
        // Process papiers in chunks to avoid memory issues if large data
        Papier::chunk(100, function ($papiers) {
            $todaydate = Carbon::today();

            foreach ($papiers as $item) {
                $lastdate = Carbon::parse($item->date_debut);
                $diff = $todaydate->diffInDays($lastdate);

                if ($diff > 10) {
                    // Send notifications in chunks for users as well
                    User::chunk(100, function ($users) use ($item) {
                        Notification::send($users, new PapierDueNotification($item));
                    });

                    if ($diff === 0) {
                        $item->update([
                            'date_debut' => Carbon::today()->addDays($diff),
                        ]);
                    }
                }
            }
        });
    }
}
