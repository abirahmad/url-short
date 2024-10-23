<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\UrlRepository;
use App\Repositories\UrlRepositoryInterface;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(UrlRepositoryInterface::class, UrlRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
