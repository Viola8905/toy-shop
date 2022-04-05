<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Requests\UpdateSettingsRequest;
use App\Models\User;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class UserController extends Controller
{
    public function authenticate(LoginRequest $request): JsonResponse
    {
        if (!auth()->attempt($request->validated())) {
            return response()->json([
                'status'  => 'error',
                'message' => trans('auth.failed')
            ], Response::HTTP_BAD_REQUEST);
        }

        return response()->json([
            'status' => 'success',
            'token'  => auth()->user()->createToken('default')->plainTextToken,
            'user'   => auth()->user()
        ], Response::HTTP_OK);
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'user'   => User::query()->create($request->processed())
        ], Response::HTTP_OK);
    }

    public function getUserInfo(): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'data'   => auth()->user()
        ]);
    }

    public function updateSettings(UpdateSettingsRequest $request): JsonResponse
    {
        auth()->user()->update($request->processed());

        return response()->json([
            'status' => 'success',
        ], Response::HTTP_OK);
    }

    public function forgotPassword(ForgotPasswordRequest $request): JsonResponse
    {
        $status = Password::sendResetLink($request->only('email'), function ($user, $token) {
            $user->notify(new ResetPasswordNotification($token));
        });

        switch ($status) {
            case Password::RESET_THROTTLED:
                return response()->json([
                    'status'  => 'error',
                    'message' => trans('passwords.throttled'),
                ], Response::HTTP_TOO_MANY_REQUESTS);
            case Password::RESET_LINK_SENT:
                return response()->json([
                    'status'  => 'success',
                    'message' => trans('passwords.sent'),
                ], Response::HTTP_OK);
            default:
                return response()->json([
                    'status'  => 'error',
                    'message' => 'Unknown server error',
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        $status = Password::reset($request->validated(), function ($user, $password) {
            $user->update(['password' => Hash::make($password)]);
        });

        switch ($status) {
            case Password::INVALID_TOKEN:
                return response()->json([
                    'status'  => 'error',
                    'message' => trans('passwords.token')
                ], Response::HTTP_BAD_REQUEST);
            case Password::PASSWORD_RESET:
                return response()->json([
                    'status'  => 'success',
                    'message' => trans('passwords.reset')
                ], Response::HTTP_OK);
            default:
                return response()->json([
                    'status'  => 'error',
                    'message' => 'Unknown server error',
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
