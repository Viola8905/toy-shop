<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetProductRequest;
use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    public function index(GetProductRequest $request): JsonResponse
    {
        $query = Product::query();

        $query->when($request->has('per_page'), function (Builder $query) use ($request) {
            $query->forPage($request->input('page'), $request->input('per_page'));
        });
        $query->when($request->has('category_ids'), function (Builder $query) use ($request) {
            $query->whereHas('categories', function (Builder $query) use ($request) {
                $query->whereIn('category_id', $request->input('category_ids'));
            });
        });

        return response()->json([
            'status' => 'success',
            'data'   => $query->with(['categories', 'reviews'])->get()
        ], Response::HTTP_OK);
    }

    public function show(Product $product): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'data'   => $product->load(['categories', 'reviews'])
        ]);
    }
}
