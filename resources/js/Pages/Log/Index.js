import { Head } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import Paginate from "@/Components/Paginate";
import React from "react";

export default function Index(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Logs</h2>}
        >
            <Head title="Logs"/>

            <div className="py-12">
                <div className="flex-col flex max-w-7xl relative mx-auto sm:px-6 lg:px-8">
                    <div>
                        <a className={
                            `my-2 inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150`
                        }
                       href={route('logs.export', { type: 'pdf' })}
                        >
                            Export activity log to PDF
                        </a>
                        <a className={
                            `mx-1 my-2 inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150`
                        }
                        href={route('logs.export', { type: 'xlsx' })}
                        >
                            Export activity log to Excel
                        </a>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Statistics</h3>
                        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                <dt className="truncate text-sm font-medium text-gray-500">Visited page action</dt>
                                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{props.visitedPagesTotal}</dd>
                            </div>

                            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                <dt className="truncate text-sm font-medium text-gray-500">Actions on organizations</dt>
                                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{props.organizationActions}</dd>
                            </div>

                            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                <dt className="truncate text-sm font-medium text-gray-500">Actions on eveniments</dt>
                                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{props.evenimentActions}</dd>
                            </div>
                        </dl>
                    </div>
                    <div className="overflow-x-auto bg-white rounded shadow my-2">
                        <table className="w-full whitespace-nowrap">
                            <thead>
                                <tr className="font-bold text-left">
                                    <th className="px-6 pt-5 pb-4 text-left">ID</th>
                                    <th className="px-6 pt-5 pb-4 text-center">Description</th>
                                    <th className="px-6 pt-5 pb-4 text-center">Causer</th>
                                    <th className="px-6 pt-5 pb-4 text-center">Subject</th>
                                    <th className="px-6 pt-5 pb-4 pr-10 text-right">Created at</th>
                                </tr>
                            </thead>
                            <tbody>
                            {props.activities.data.map((activity) => {
                                return (
                                    <tr
                                        key={activity.id}
                                        className="hover:bg-gray-100 focus-within:bg-gray-100"
                                    >
                                        <td className="border-t py-4 pl-4 text-grey-700 text-left">
                                            {activity.id || ''}
                                        </td>
                                        <td className="border-t text-grey-700 text-center">
                                            {activity.description || ''}
                                        </td>
                                        <td className="border-t text-green-700 text-center">
                                            {`${activity.causer_type} ID:${activity.causer_id}` || ''}
                                        </td>
                                        <td className="w-px border-t text-red-700 text-center">
                                            {`${activity.subject_type} ID:${activity.subject_id}` || ''}
                                        </td>
                                        <td className="border-t text-grey-700 text-right pr-4">
                                            {new Date(activity.created_at).toLocaleString() || ''}
                                        </td>
                                    </tr>
                                );
                            })}
                            {props.activities.data.length === 0 && (
                                <tr>
                                    <td className="px-6 py-4 border-t" colSpan="4">
                                        No organizations found.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    <Paginate links={props.activities.links}/>
                </div>
            </div>
        </Authenticated>
    );
}
