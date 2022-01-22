<?php

namespace Tests\Feature;

use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use App\Models\UserActivity;

class HealthControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @group HealthController#index
     */
    public function test_returns_health_status()
    {
        $response = $this->get('/api/health');
        $response->assertStatus(200);
        $response->assertJson([
            'status' => 'OK'
        ]);
    }

    /**
     * @group HealthController#index
     */
    public function test_returns_activity_metrics()
    {
        UserActivity::factory()->count(2)->create(['created_at' => Carbon::now()]);
        UserActivity::factory()->count(3)->create(['created_at' => Carbon::now()->subMinutes(20)]);
        UserActivity::factory()->count(4)->create(['created_at' => Carbon::now()->subHours(2)]);

        $response = $this->get('/api/health');
        $response->assertStatus(200);
        $response->assertJson([
            'status' => 'OK',
            'metrics' => [
                'logins' => [
                    'last_hour' => 5,
                    'last_15_mnutes' => 2,
                    'last_24_hours' => 9,
                ],
            ]
        ]);
    }
}
