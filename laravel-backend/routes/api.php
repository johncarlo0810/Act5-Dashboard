<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {

    // Base API route
    Route::get('/', function () {
        return response()->json([
            'message' => 'API V1 is working!',
        ]);
    });

    // Product queries - place before apiResource
    Route::get('/products/queries', [ProductController::class, 'queries']);

    // Product CRUD routes
    Route::apiResource('products', ProductController::class);

    // Category route
    Route::get('/categories', [CategoryController::class, 'index']);
});