<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VersionControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @group VersionController#index
     */
    public function test_returns_version_from_version_file()
    {
        $version = file_get_contents(base_path('VERSION'));

        $response = $this->get('/api/version');
        $response->assertStatus(200);
        $response->assertJson([
            'status' => true,
            'version' => $version
        ]);
    }
}
