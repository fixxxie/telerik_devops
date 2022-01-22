<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DatabaseSetup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:setup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check if the database schema is loaded and load if necessary.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $schema = DB::select(DB::raw('SHOW TABLES'));

        foreach ($schema as $table) {
            foreach ($table as $key => $name) {
                if ($name == 'migrations') {
                    // Schema is valid only run migrations
                    $this->info('Running migrations...');
                    Artisan::call('migrate --force');
                    return 0;
                }
            }
        }

        $this->info('Creating new schema...');
        Artisan::call('migrate:install');
        Artisan::call('migrate --force');
        Artisan::call('db:seed --force');

        return 0;
    }
}
