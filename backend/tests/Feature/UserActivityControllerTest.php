<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use App\Models\User;
use App\Models\UserActivity;

class UserActivityControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void {
        parent::setUp();

        if (!isset($this->user)) {
            $this->user = User::factory()->create();
        }
    }

    /**
     * @group UserActivityController#activity
     */
    public function test_lists_user_activity()
    {
        $activity = UserActivity::factory()->create(['user_id' => $this->user->id]);
        $response = $this->actingAs($this->user)->get('/api/users/' . $this->user->id . '/activity');

        $response->assertStatus(200);
        $response->assertJson([
            'activity' => [[
                'id' => $activity->id,
                'type' => 'login',
                'user_id' => $this->user->id,
            ]],
        ]);
    }

    /**
     * @group UserActivityController#activity
     */
    public function test_lists_does_not_return_activity_for_other_users()
    {
        $user = User::factory()->create();
        $activity = UserActivity::factory()->create(['user_id' => $user->id]);
        $response = $this->actingAs($this->user)->get('/api/users/' . $user->id . '/activity');
        $data = $response->json();

        $response->assertStatus(200);
        $this->assertEquals([], $data['activity']);
    }
}
