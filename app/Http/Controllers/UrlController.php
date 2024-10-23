<?php

// app/Http/Controllers/UrlController.php
namespace App\Http\Controllers;

use App\Models\Url;
use App\Repositories\UrlRepositoryInterface;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class UrlController extends Controller
{
    protected $urlRepository;

    public function __construct(UrlRepositoryInterface $urlRepository)
    {
        $this->urlRepository = $urlRepository;
    }

    public function index()
    {
        $urls = $this->urlRepository->all();
        return Inertia::render('UrlList', ['urls' => $urls]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'long_url' => 'required|url',
        ]);
        try {

            $shortUrl = Str::random(6);
            $this->urlRepository->create([
                'long_url' => $request->long_url,
                'short_url' => $shortUrl,
            ]);

            return redirect()->back()->with('success', 'URL created successfully.')->header('Access-Control-Allow-Origin', '*');
        } catch (QueryException  $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {

        $url = $this->urlRepository->find($id);

        $request->validate([
            'long_url' => 'required|url',
            'short_url' => 'required|unique:urls,short_url,' . $url->id,
        ]);

        try {

            $this->urlRepository->update($url, $request->only('long_url', 'short_url'));

            return redirect()->back()->with('success', 'URL updated successfully.');
        } catch (QueryException  $e) {
            return redirect()->back()->with(['error' => $e->getMessage()], 500);
        }
    }

    public function redirect($shortUrl)
    {
        $url = $this->urlRepository->findByShortUrl($shortUrl);

        if ($url) {
            return redirect($url->long_url);
        }

        return back()->with(['error' => 'URL not found'], 404)->header('Access-Control-Allow-Origin', '*');
    }

    public function destroy($id)
    {
        $this->urlRepository->delete($id);

        return redirect()->back()->with('success', 'URL deleted successfully.');
    }
}
