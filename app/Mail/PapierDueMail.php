<?php

declare(strict_types=1);

namespace App\Mail;

use App\Models\Papier;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

final class PapierDueMail extends Mailable
{
    use Queueable;
    use SerializesModels;

    public function __construct(public Papier $papier, public $username) {}

    public function build()
    {
        return $this->view('Mail.papierNearToEnd')
            ->with(['papier' => $this->papier, 'user' => $this->username]);
    }
}
