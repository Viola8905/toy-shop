<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GeneralController extends Controller
{
    public function route(): JsonResponse
    {
        return response()->json([
            'app_name'    => config('app.name'),
            'app_version' => config('app.version'),
        ], Response::HTTP_OK);
    }

    public function ping(): JsonResponse
    {
        return response()->json([
            'status'  => 'success',
            'message' => 'pong',
        ]);
    }
}
