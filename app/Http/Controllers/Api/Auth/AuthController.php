<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

final class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validated = $this->validateCredentials($request);

        if (! $user = $this->getAuthenticatedUser($validated)) {
            return $this->sendFailedLoginResponse();
        }

        return $this->sendSuccessResponse($user);
    }

    /**
     * Handle user logout
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return \response()->json([
            'message' => 'Successfully logged out',
        ]);
    }

    protected function validateCredentials(Request $request): array
    {
        return $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string|min:8',
        ]);
    }

    protected function getAuthenticatedUser(array $credentials): ?User
    {
        $user = User::where('email', $credentials['email'])->first();

        return $user && Hash::check($credentials['password'], $user->password)
            ? $user
            : null;
    }

    protected function sendFailedLoginResponse()
    {
        return \response()->json([
            'message' => 'Invalid credentials',
            'errors' => [
                'email' => ['The provided credentials are incorrect.'],
            ],
        ], 401);
    }

    protected function sendSuccessResponse(User $user)
    {
        $token = $user->createToken('auth_token')->plainTextToken;

        return \response()->json([
            'message' => 'Login successful',
            'user' => $user->only(['id', 'name', 'email']), // Only return necessary fields
            'token' => $token,
            'token_type' => 'Bearer',
        ]);
    }
}
