<?php

// app/Repositories/UrlRepositoryInterface.php
namespace App\Repositories;

use App\Models\Url;

interface UrlRepositoryInterface
{
    public function all();
    public function create(array $data);
    public function update(Url $url, array $data);
    public function delete($id);
    public function findByShortUrl(string $shortUrl);
    public function find($id);
}
