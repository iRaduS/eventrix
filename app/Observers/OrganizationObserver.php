<?php

namespace App\Observers;

use App\Jobs\CreateOrganizationJob;
use App\Models\Organization;
use App\Models\User;
use App\Traits\Loggable;

class OrganizationObserver
{
    use Loggable;

    public function creating(Organization $organization) {
        $organizationOwner = User::createOrganizationOwner($organization);
        $organization->owner_id = $organizationOwner[0]->id;

        $dispatchData = [
            'password' => $organizationOwner[1],
            'email' => $organizationOwner[0]->email,
            'name' => $organizationOwner[0]->name,
        ];

        dispatch(new CreateOrganizationJob($dispatchData));
    }

    public function created(Organization $organization) {
        try {
            $organization->user()->update(['organization_id' => $organization->id]);
        } catch (\Exception $exception) {
            $this->sendDebugLogs(self::class, $exception);
        }
    }
}
