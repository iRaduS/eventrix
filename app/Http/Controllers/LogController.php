<?php

namespace App\Http\Controllers;

use App\Exports\ActivitiesExport;
use App\Traits\Loggable;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Spatie\Activitylog\Models\Activity;

class LogController extends Controller
{
    use Loggable;

    public function index() {
        $activities = Activity::orderBy('id', 'DESC')->paginate();


        $organizationActions = Activity::where('subject_type', \App\Models\Organization::class)->get()->count();
        $evenimentActions = Activity::where('subject_type', \App\Models\Eveniment::class)->get()->count();
        $visitedPagesTotal = $activities->total() - $organizationActions - $evenimentActions;

        return Inertia::render("Log/Index", [
            'activities' => $activities,
            'visitedPagesTotal' => $visitedPagesTotal,
            'organizationActions' => $organizationActions,
            'evenimentActions' => $evenimentActions
        ]);
    }

    public function export(string $type) {
        if (!in_array($type, ["pdf", "xlsx"]))
            return Redirect::to("/logs")->with(['error' => __('The format can\'t be found it must be exported as PDF or Excel')]);

        try {
            $ext = Str::lower($type);

            return Excel::download(new ActivitiesExport, "activityLog.{$ext}", $ext === "pdf" ? \Maatwebsite\Excel\Excel::MPDF : \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Exception $exception) {
            return Redirect::to("/logs")->withErrors($exception->getMessage());
        }
    }
}
