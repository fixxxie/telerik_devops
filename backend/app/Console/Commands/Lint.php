<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class Lint extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'lint';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Lint the codebase.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $process = new Process([base_path('vendor/bin') . '/phpcs', 'app']);
        $process->start();

        foreach ($process as $type => $data) {
            echo $data;
        }

        return $process->getExitCode();
    }
}
