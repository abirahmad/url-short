<?php

use App\Http\Controllers\UrlController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/urls');
Route::get('/urls', [UrlController::class, 'index'])->name('urls.index');
Route::post('/urls/store', [UrlController::class, 'store']);
Route::post('/urls/{id}', [UrlController::class, 'update'])->name('urls.update');
Route::post('/urls/delete/{id}', [UrlController::class, 'destroy'])->name('urls.destroy');
Route::get('/{shortUrl}', [UrlController::class, 'redirect']);
