<?php /** @noinspection PhpUndefinedFieldInspection */

namespace App\Http\Controllers;

use App\Http\Controllers\ProductReview\UpdateRequest;
use App\Http\Requests\ProductReview\DeleteRequest;
use App\Http\Requests\ProductReview\StoreRequest;
use App\Models\ProductReview;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class ProductReviewController extends Controller
{
    // todo: add setting 'bought_already' by checking whether or not there's at least 1 completed order
    public function store(StoreRequest $request): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'data'   => ProductReview::query()->create(array_merge(
                $request->validated(),
                ['user_id' => auth()->user()->id]
            )),
        ]);
    }

    public function update(UpdateRequest $request, ProductReview $productReview): JsonResponse
    {
        $productReview->update($request->validated());
        return response()->json([
            'status' => 'success',
        ]);
    }

    public function delete(DeleteRequest $request, ProductReview $productReview): JsonResponse
    {
        $productReview->delete();
        return response()->json([
            'status' => 'success',
        ]);
    }
}
