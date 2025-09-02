<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Foundation\Inspiring;

final class MakeActionCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:action {name : The name of the action class}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create new action class';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $name = $this->argument('name');

        // Convert path and class parts
        $name = \str_replace('\\', '/', $name);
        $classPath = \app_path("Actions/{$name}.php");
        $className = \class_basename($name);
        $namespace = 'App\\Actions\\'.\str_replace('/', '\\', \dirname($name));

        // Prepare the folder
        $dir = \dirname($classPath);
        if (! \is_dir($dir)) {
            \mkdir($dir, 0755, true);
        }

        // Check for existing file
        if (\file_exists($classPath)) {
            $this->error("File already exists at: {$classPath}");

            return;
        }

        // Load the stub
        $stubPath = \base_path('stubs/action.stub');
        if (! \file_exists($stubPath)) {
            $this->error('Stub file not found at: stubs/action.stub');

            return;
        }

        $stub = \file_get_contents($stubPath);

        // Replace placeholders
        $content = \str_replace(
            ['{{ namespace }}', '{{ class }}'],
            [$namespace, $className],
            $stub
        );

        // Save the file
        \file_put_contents($classPath, $content);

        $this->line('');
        $this->info('✅ Action created successfully!');
        $this->line('');
        $this->comment("📁 Location: {$classPath}");
        $this->comment("🏷️  Class: {$className}");
        $this->comment("📦 Namespace: {$namespace}");
        $this->line('');
        $this->line(Inspiring::quote());
    }
}
