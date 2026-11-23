<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderProductController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\ReviewController;

Route::get('/', function () {
    return response()->json([
        'message' => 'Welcome to Product API',
        'status' => 200,
    ]);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/products/queries', [ProductController::class, 'queries']);

Route::apiResource('products', ProductController::class);

Route::apiResource('categories', CategoryController::class);

Route::apiResource('orders', OrderController::class);

Route::apiResource('order-products', OrderProductController::class);

Route::apiResource('addresses', AddressController::class);

Route::apiResource('reviews', ReviewController::class);
