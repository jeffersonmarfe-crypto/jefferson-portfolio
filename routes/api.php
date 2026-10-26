<?php

use App\Http\Controllers\ContactMessageController;
use Illuminate\Support\Facades\Route;

Route::get('/health', fn () => response()->json(['status' => 'ok']));
Route::post('/contact', [ContactMessageController::class, 'store'])->middleware('throttle:5,1');
