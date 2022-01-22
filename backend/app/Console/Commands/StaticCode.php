<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class StaticCode extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'analyse:code';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Static analysis of the codebase.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $process = new Process([base_path('vendor/bin') . '/phpstan', 'analyse', '--memory-limit=500M']);
        $process->start();

        foreach ($process as $type => $data) {
            echo $data;
        }

        return $process->getExitCode();
    }
}
