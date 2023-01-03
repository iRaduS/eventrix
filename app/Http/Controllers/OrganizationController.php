<?php

namespace App\Http\Controllers;

use App\Transformers\OrganizationTransformer;
use App\Http\Requests\OrganizationRequest;
use App\Models\Organization;
use App\Traits\Loggable;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class OrganizationController extends Controller
{
    use Loggable;

    public function index(): \Inertia\Response
    {
        $organizations = Organization::paginate();

        activity()->causedBy(auth()->user())->log("visited page Organizations > Index");
        return Inertia::render('Organizations/Index', compact('organizations'));
    }

    public function store(OrganizationRequest $request, OrganizationTransformer $transformer): \Illuminate\Http\RedirectResponse
    {
        try {
            $organization = Organization::create($transformer->transform($request->all()));

            activity()->performedOn($organization)->causedBy(auth()->user())->log("created an Organization");
        } catch (\Exception $exception) {
            $this->sendDebugLogs(self::class, $exception);

            return Redirect::back()->withErrors($exception->getMessage());
        }

        return Redirect::back()->with(['success' => __('The organization was created with success.')]);
    }

    public function delete(Organization $organization): \Illuminate\Http\RedirectResponse
    {
        try {
            $organization->delete();

            activity()->performedOn($organization)->causedBy(auth()->user())->log("deleted an Organization");
        } catch (\Exception $exception) {
            $this->sendDebugLogs(self::class, $exception);

            return Redirect::back()->withErrors($exception->getMessage());
        }

        return Redirect::back()->with(['success' => __('The organization was deleted with success.')]);
    }

    public function update(Organization $organization, OrganizationRequest $request, OrganizationTransformer $transformer): \Illuminate\Http\RedirectResponse
    {
        try {
            $organization->update($transformer->transform($request->all()));

            activity()->performedOn($organization)->causedBy(auth()->user())->log("updated an Organization");
        } catch (\Exception $exception) {
            $this->sendDebugLogs(self::class, $exception);

            return Redirect::back()->withErrors($exception->getMessage());
        }

        return Redirect::back()->with(['success' => __('The organization was updated with success.')]);
    }
}
