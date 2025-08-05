<?php

declare(strict_types=1);

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

final class PapierDueNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public $papier)
    {
        //
    }

    public function via($notifiable)
    {
        return ['database', 'mail'];
    }

    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Papier Due Soon: '.$this->papier->title)
            ->view('Mail.papierNearToEnd', [
                'papier' => $this->papier,
                'user' => $notifiable->name,
            ]);

    }

    public function toDatabase($notifiable): array
    {
        return [
            'papier_id' => $this->papier->id,
            'title' => $this->papier->title,
            'due_date' => $this->papier->due_date,
            'message' => 'You have a Papier entry due soon: '.$this->papier->title,
            'action_url' => \url('/papiers/'.$this->papier->id),
        ];
    }
}
