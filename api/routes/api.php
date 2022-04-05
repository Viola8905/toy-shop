<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductReviewController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GeneralController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1'], function () {
    Route::get('/', [GeneralController::class, 'route']);
    Route::get('/ping', [GeneralController::class, 'ping']);

    Route::post('/login', [UserController::class, 'authenticate'])->name('login');
    Route::post('/register', [UserController::class, 'register'])->name('register');

    Route::post('/forgot-password', [UserController::class, 'forgotPassword']);
    Route::post('/reset-password', [UserController::class, 'resetPassword']);

    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{product}', [ProductController::class, 'show']);

    Route::group(['middleware' => 'auth:sanctum'], function () {
        Route::get('/user/info', [UserController::class, 'getUserInfo']);
        Route::post('/update-settings', [UserController::class, 'updateSettings']);

        Route::post('/product-reviews', [ProductReviewController::class, 'store']);
        Route::patch('/product-reviews/{productReview}', [ProductReviewController::class, 'update']);
        Route::delete('/product-reviews/{productReview}', [ProductReviewController::class, 'delete']);
    });
});
