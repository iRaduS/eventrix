import React from 'react';
import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm } from "@inertiajs/inertia-react";
import ValidationErrors from "@/Components/ValidationErrors";
import FileInput from "@/Components/FileInput";

export default function Create(props) {
    const {data, setData, post, errors, processing} = useForm({
        name: props.user.name,
        email: props.user.email,
        description: `Congrats, ${props.user.name} for being one of the most active volunteer in ${props.eveniment.name}.`,
        attachment: '',
    });

    const handleSubmit = e => {
        e.preventDefault();
        post(route('reward.store', { eveniment: props.eveniment.id, user: props.user.id }))
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Reward {props.user.name} for event {props.eveniment.name}</h2>}
        >

            <Head title="Reward" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ValidationErrors errors={errors} />
                    <form onSubmit={handleSubmit} method="POST">
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">User Name</label>
                                    <input onChange={e => setData('name', e.target.value)} type="text" value={data.name} name="name" id="first-name" autoComplete="name"
                                           className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">User Email</label>
                                    <input onChange={e => setData('name', e.target.value)} type="email" value={data.email} name="email" id="email" autoComplete="email"
                                           className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Reward Description</label>
                                    <textarea onChange={e => setData('description', e.target.value)} value={data.description} id="about" name="about" rows="3"
                                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                              placeholder="Enter description of event..."/>
                                </div>
                                <FileInput
                                    className="w-full pb-8 pr-6 lg:w-1/2"
                                    label="Reward Document"
                                    name="attachment"
                                    accept=""
                                    errors={errors.attachment}
                                    value={data.attachment}
                                    onChange={document => setData('attachment', document)}
                                />
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Send reward
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Authenticated>
    );
}
