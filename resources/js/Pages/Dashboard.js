import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import Paginate from "@/Components/Paginate";
import Button from "@/Components/Button";
import 'leaflet/dist/leaflet.css';
import {Inertia} from "@inertiajs/inertia";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

export default function Dashboard(props) {
    const toEventType = (type) => {
        switch (type) {
            case 1: return 'Actiuni de reciclare';
            case 2: return 'Actiuni de impadurire';
            case 3: return 'Actiuni de igienizare';
        }
    }
    const [position, setPosition] = React.useState(false);
    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setPosition({lat: pos.coords.latitude, lng: pos.coords.longitude})
        }, () => {
            setPosition({lat: 0.0, lng: 0.0})
        });
    }, []);

    const handleJoin = (evenimentId) => {
        if (confirm("Are you sure you want to join?")) {
            Inertia.post(route('participant.participate', evenimentId))
        }
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

                    {
                        (props.auth.user.organization_id == null || !props.auth.user.organization_id) ?
                            <div className="py-12">
                                <div className="grid grid-cols-4 grid-gaps-6 mx-auto sm:px-6 lg:px-12">
                                {
                            props.eveniments.data.map(eveniment => (
                                <div className="flex antialiased text-gray-900" key={eveniment.id}>
                                    <div>

                                        <img src={`/storage/eveniments/${eveniment.banner_picture}`} alt=" random imgee"
                                         className="object-cover object-center rounded-lg shadow-md" height="350" width="350" />

                                        <div className="relative px-4 -mt-16  ">
                                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                                <div className="flex items-baseline">
                                                  <span
                                                      className={`${eveniment.closed ? 'bg-red-500' : 'bg-green-500'} text-white text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide`}>
                                                    {eveniment.closed ? 'CLOSE' : 'OPEN'}
                                                  </span>
                                                    <div
                                                        className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                                                        {eveniment.users.length} current &bull; {eveniment.participants} total
                                                    </div>
                                                </div>

                                                <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">{eveniment.name}</h4>

                                                <div>
                                                    <small className="text-gray-500">{eveniment.description}</small>
                                                </div>

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
                                                        : <small className="text-red-600">No data aboutt weather!</small>
                                                }

                                                <div className="mt-4">
                                                    {
                                                        eveniment.users.length <= eveniment.participants && !eveniment.closed && !eveniment.users.some(user => user.id === props.auth.user.id)?
                                                        <Button className="bg-green-500" onClick={() => handleJoin(eveniment.id)}>Join this event</Button> :
                                                        <Button className="bg-gray-300">No joins allowed</Button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                                }

                                <Paginate links={props.eveniments.links} />

                            </div>
                        </div>
                        :


                            <>
                                {
                                    position &&
                                    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                                        <TileLayer
                                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        {
                                            props.eveniments.map(eveniment => (
                                                <Marker position={({lat: eveniment.lat, lng: eveniment.long})} key={eveniment.id}>
                                                    <Popup minWidth={90}>
                                                        <div className="text-center text-green-600 font-black">{toEventType(eveniment.type)}</div>
                                                        Eveniment: {eveniment.name}
                                                        <br/>
                                                        Data organizarii: {eveniment.created_at}
                                                    </Popup>
                                                </Marker>
                                            ))
                                        }
                                    </MapContainer>
                                }
                                <div className="py-12">
                                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                        <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-8">
                                            <div className="shadow-sm bg-white w-full flex items-center justify-center py-12 px-6" key="1">
                                                <div className="text-4xl rounded-full h-24 w-24 flex items-center text-white justify-center bg-green-500 mx-3">
                                                {
                                                    props.eveniments.reduce((previous, current) => current.type == 1 ? previous + 1 : previous, 0)
                                                }
                                                </div>
                                                <div className="text-xl text-black">{toEventType(1)}</div>
                                            </div>
                                            <div className="shadow-sm bg-white w-full flex items-center justify-center py-12 px-6" key="2">
                                                <div className="text-4xl rounded-full h-24 w-24 flex items-center text-white justify-center bg-green-500 mx-3">
                                                    {
                                                        props.eveniments.reduce((previous, current) => current.type == 2 ? previous + 1 : previous, 0)
                                                    }
                                                </div>
                                                <div className="text-xl text-black">{toEventType(2)}</div>
                                            </div>
                                            <div className="shadow-sm bg-white w-full flex items-center justify-center py-12 px-6" key="3">
                                                <div className="text-4xl rounded-full h-24 w-24 flex items-center text-white justify-center bg-green-500 mx-3">
                                                    {
                                                        props.eveniments.reduce((previous, current) => current.type == 3 ? previous + 1 : previous, 0)
                                                    }
                                                </div>
                                                <div className="text-xl text-black">{toEventType(3)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                    }
        </Authenticated>
    );
}
