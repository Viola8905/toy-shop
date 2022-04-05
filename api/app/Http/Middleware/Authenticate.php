<?php /** @noinspection PhpInconsistentReturnPointsInspection */

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    public function handle($request, Closure $next, ...$guards)
    {
        $request->headers->set('Authorization', "Bearer {$request->header('sanctum')}");
        return parent::handle($request, $next, $guards[0]);
    }
}
