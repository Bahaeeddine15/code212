<?php

use App\Http\Controllers\Api\ImageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Routes for image management
Route::middleware(['auth'])->group(function () {
    Route::prefix('images')->group(function () {
        Route::post('upload', [ImageController::class, 'upload'])->name('api.images.upload');
        Route::delete('delete', [ImageController::class, 'delete'])->name('api.images.delete');
    });
});
