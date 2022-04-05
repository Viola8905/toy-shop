<?php

namespace App\Traits;

/** @property array $hidden */
trait HidesPivot
{
    /**
     * @return array
     */
    public function getHidden(): array
    {
        return array_merge($this->hidden, ['pivot']);
    }
}
