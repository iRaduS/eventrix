import React from 'react';
import Authenticated from "@/Layouts/Authenticated";
import Paginate from "@/Components/Paginate";
import {Head, InertiaLink} from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import {Inertia} from "@inertiajs/inertia";

export default function Index(props) {
    const handleApplications = (id) => {
        if (confirm('Are you sure you want to do this action?')) {
            Inertia.patch(route('eveniments.applications', id))
        }
    }

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this event?')) {
            Inertia.delete(route('eveniments.delete', id));
        }
    }

    const toEventType = (type) => {
        switch (type) {
            case 1: return 'Actiuni de reciclare';
            case 2: return 'Actiuni de impadurire';
            case 3: return 'Actiuni de igienizare';
        }
    }
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Events</h2>}
        >

            <Head title="Events" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <InertiaLink className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600"
                                 href={route('eveniments.create')} >Create a new event</InertiaLink>

                    <div className="overflow-x-auto bg-white rounded shadow my-2">
                        <table className="w-full whitespace-nowrap">
                            <thead>
                            <tr className="font-bold text-left">
                                <th className="px-6 pt-5 pb-4">Name</th>
                                <th className="px-6 pt-5 pb-4">Dates</th>
                                <th className="px-6 pt-5 pb-4">Weather</th>
                                <th className="px-6 pt-5 pb-4">Participants</th>
                            </tr>
                            </thead>
                            <tbody>
                            {props.eveniments.data.map(eveniment => {
                                return (
                                    <tr
                                        key={eveniment.id}
                                        className="hover:bg-gray-100 focus-within:bg-gray-100"
                                    >
                                        <td className="border-t">
                                            <InertiaLink
                                                href={route('eveniments.edit', eveniment.id)}
                                                className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                                            >
                                                <div>
                                                    {eveniment.name} <small className="text-green-500 font-black">{toEventType(eveniment.type)}</small>
                                                    <br />
                                                    <small className="text-gray-500">{eveniment.description}</small>
                                                </div>
                                            </InertiaLink>
                                        </td>
                                        <td className="border-t">
                                            <InertiaLink
                                                tabIndex="-1"
                                                href={route('eveniments.edit', eveniment.id)}
                                                className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                                            >
                                                <small className="text-gray-500">{eveniment.started_at} - {eveniment.ended_at}</small>
                                            </InertiaLink>
                                        </td>
                                        <td className="border-t">
                                            <InertiaLink
                                                tabIndex="-1"
                                                href={route('eveniments.edit', eveniment.id)}
                                                className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                                            >
                                                {
                                                    eveniment.weatherData.main ?
                                                    <div>
                                                        <small
                                                            className="text-yellow-400">{eveniment.weatherData.main.temp}°C</small>
                                                        <br/>
                                                        <small className="text-red-600">
                                                            <strong>MAX: {eveniment.weatherData.main.temp_max}°C</strong>
                                                        </small>
                                                        <br/>
                                                        <small className="text-blue-800">
                                                            <strong>MIN: {eveniment.weatherData.main.temp_min}°C</strong>
                                                        </small>
                                                    </div>
                                                    : <small className="text-red-600">No data about weather!</small>
                                                }
                                            </InertiaLink>
                                        </td>
                                        <td className="border-t">
                                            <InertiaLink
                                                tabIndex="-1"
                                                href={route('eveniments.edit', eveniment.id)}
                                                className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                                            >
                                                {eveniment.participants}
                                            </InertiaLink>
                                        </td>
                                        <td className="w-px border-t">
                                            <div className="flex items-center px-6 py-4">
                                                <Button className={`${eveniment.closed ? 'bg-green-500' : 'bg-red-500'} mx-1`} onClick={() => handleApplications(eveniment.id)}>{eveniment.closed ? 'Open registrations' : 'Close registrations'}</Button>
                                                <Button className="bg-red-600" onClick={() => handleDelete(eveniment.id)}>Delete</Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {props.eveniments.length === 0 && (
                                <tr>
                                    <td className="px-6 py-4 border-t" colSpan="4">
                                        No events found.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    <Paginate links={props.eveniments.links} />
                </div>
            </div>
        </Authenticated>
    );
}
