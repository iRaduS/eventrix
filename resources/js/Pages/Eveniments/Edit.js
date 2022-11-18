import React from 'react';
import Authenticated from "@/Layouts/Authenticated";
import {Head, InertiaLink} from "@inertiajs/inertia-react";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useForm } from '@inertiajs/inertia-react';
import ValidationErrors from "@/Components/ValidationErrors";
import FileInput from "@/Components/FileInput";
import Button from "@/Components/Button";
import {Inertia} from "@inertiajs/inertia";
import Paginate from "@/Components/Paginate";

export default function Edit(props) {
    const { eveniment } = props;
    const { data, setData, errors, reset, post, processing }  = useForm({
        lat: eveniment.lat,
        long: eveniment.long,
        name: eveniment.name,
        description: eveniment.description,
        started_at: eveniment.started_at,
        ended_at: eveniment.ended_at,
        participants: eveniment.participants,
        type: eveniment.type,
        banner_picture: '',
        _method: 'PATCH'
    })

    React.useEffect(() => {
        console.log(props.participants)
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        post(route('eveniments.update', {eveniment: eveniment.id}))
    }

    const handleDelete = (evenimentId, userId) => {
        if (confirm('Are you sure you want to proceed?')) {
            Inertia.delete(route('participant.leave', {eveniment: evenimentId, user: userId}))
        }
    }

    const [draggable, setDraggable] = React.useState(false)
    const [latitude, setLatitude] = React.useState(eveniment.lat)
    const [longitude, setLongitude] = React.useState(eveniment.long)
    const markerRef = React.useRef(null)
    const eventHandlers = React.useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    const latLng = marker.getLatLng()
                    setLongitude(latLng.lng)
                    setLatitude(latLng.lat)
                }
            },
        }),
        [],
    )
    const toggleDraggable = React.useCallback(() => {
        setDraggable((d) => !d)
    }, [])

    React.useEffect(() => {
        setData('lat', latitude)
    }, [latitude])

    React.useEffect(() => {
        setData('long', longitude)
    }, [longitude])

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">New event for {props.auth.user.organization.name}</h2>}
        >

            <Head title="Events | Create" />

            {
                longitude && latitude &&
                <MapContainer center={({lat: latitude, lng: longitude})} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                        draggable={draggable}
                        eventHandlers={eventHandlers}
                        position={({lat: latitude, lng: longitude})}
                        ref={markerRef}
                    >
                        <Popup minWidth={90}>
                            <span onClick={toggleDraggable}>
                              {draggable
                                  ? 'Marker is draggable'
                                  : 'Click here to make marker draggable'}
                            </span>
                        </Popup>
                    </Marker>
                </MapContainer>
            }

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ValidationErrors errors={errors} />
                    <form onSubmit={handleSubmit} method="POST">
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Event Name</label>
                                    <input onChange={e => setData('name', e.target.value)} type="text" value={data.name} name="name" id="first-name" autoComplete="name"
                                           className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Event Description</label>
                                    <textarea onChange={e => setData('description', e.target.value)} value={data.description} id="about" name="about" rows="3"
                                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                              placeholder="Enter description of event..."/>
                                </div>

                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">Start
                                            Date</label>
                                        <input onChange={e => setData('started_at', e.target.value)}  value={data.started_at} type="datetime-local" name="first-name" id="first-name" autoComplete="given-name"
                                               className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">End
                                            Date</label>
                                        <input onChange={e => setData('ended_at', e.target.value)}  value={data.ended_at} type="datetime-local" name="last-name" id="last-name" autoComplete="family-name"
                                               className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                    </div>
                                </div>

                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="participants" className="block text-sm font-medium text-gray-700">Participant Number</label>
                                        <input onChange={e => setData('participants', e.target.value)} value={data.participants} type="number" name="participants" id="first-name" autoComplete="given-name"
                                               className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Event Type</label>
                                        <select onChange={e => setData('type', e.target.value)} value={data.type} name="last-name" id="last-name" autoComplete="family-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                            <option value="1" defaultValue>Actiuni de reciclare</option>
                                            <option value="2">Actiuni de impadurire</option>
                                            <option value="3">Actiuni de igienizare</option>
                                        </select>
                                    </div>
                                </div>

                                <FileInput
                                    className="w-full pb-8 pr-6 lg:w-1/2"
                                    label="Banner Photo"
                                    name="photo"
                                    accept="image/*"
                                    errors={errors.banner_picture}
                                    value={data.banner_picture}
                                    onChange={photo => setData('banner_picture', photo)}
                                />
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>

                <div className="overflow-x-auto bg-white rounded shadow my-2">
                    <table className="w-full whitespace-nowrap">
                        <thead>
                        <tr className="font-bold text-left">
                            <th className="px-6 pt-5 pb-4">Name</th>
                            <th className="px-6 pt-5 pb-4">Email Address</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.participants.data[0].users.map(user => {
                            return (
                                <tr
                                    key={user.id}
                                    className="hover:bg-gray-100 focus-within:bg-gray-100"
                                >
                                    <td className="border-t">
                                        <div
                                            className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                                        >
                                            <div>{user.name}</div>
                                        </div>
                                    </td>
                                    <td className="border-t">
                                        <div
                                            tabIndex="-1"
                                            className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                                        >
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="w-px border-t">
                                        <div className="flex items-center px-6 py-4">
                                            {
                                                new Date() >= new Date(eveniment.ended_at) &&
                                                <InertiaLink href={route('reward.create', {eveniment: eveniment.id, user: user.id})}
                                                             className="mx-1 inline-flex justify-center py-2 px-4 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest  text-white bg-yellow-600"
                                                >
                                                    Reward
                                                </InertiaLink>

                                            }
                                            <Button className="bg-red-600" onClick={() => handleDelete(eveniment.id, user.id)}>Kick</Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        {props.participants.data[0].users.length === 0 && (
                            <tr>
                                <td className="px-6 py-4 border-t" colSpan="4">
                                    No participants found.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <Paginate links={props.participants.links} />
                </div>
            </div>
        </Authenticated>
    );
}
