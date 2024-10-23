<?php

// app/Repositories/UrlRepository.php
namespace App\Repositories;

use App\Models\Url;

class UrlRepository implements UrlRepositoryInterface
{

    protected $url;

    public function __construct(Url $url)
    {
        $this->url = $url;
    }

    public function all()
    {
        return $this->url->all();
    }

  public function create(array $data)
    {
        return $this->url->create($data);
    }

    public function findByShortUrl(string $shortUrl)
    {
        return Url::where('short_url', $shortUrl)->first();
    }

    public function find($id)
    {
        return Url::where('id', $id)->first();
    }

    public function update(Url $url, array $data)
    {
        $url->update($data);
        return $url;
    }

    public function delete($id)
    {
        return Url::where('id', $id)->delete();
    }
}
