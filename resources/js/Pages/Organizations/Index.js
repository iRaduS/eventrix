import React, {useEffect, useState} from 'react';
import Authenticated from "@/Layouts/Authenticated";
import Paginate from "@/Components/Paginate";
import {Head, useForm} from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import {Inertia} from "@inertiajs/inertia";

export default function Index(props) {
    const {data, setData, errors, reset, post, processing} = useForm({
        name: '',
        description: '',
        email: '',
        address: '',
        phone: '',
        website: '',
        type: ''
    })

    const [modal, setModal] = useState(false);
    const [selectedOrganization, setSelectedOrganization] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        post(route('organizations.store'))
        setModal(false);
    }

    useEffect(() => {
        console.log(selectedOrganization);
    }, [selectedOrganization]);

    function handleSubmitEdit(e, id) {
        e.preventDefault();
        patch(route('organizations.update'), id)
        setModal(false);
    }

    const handleAction = (name, id) => {
        switch (name) {
            case 'create': {
                setModal(true);
                setSelectedOrganization(false);
                break;
            }
            case 'edit': {
                setModal(true);
                setSelectedOrganization(props.organizations.data.find(organization => organization.id === id))
                break;
            }
            case 'delete': {
                Inertia.delete(route('organizations.delete', id))
                setSelectedOrganization(false);
                break;
            }
        }
    }
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Organizations</h2>}
        >

            <Head title="Organizations"/>

            <div className="py-12">
                <div className="flex-col flex max-w-7xl relative mx-auto  sm:px-6 lg:px-8">
                    <Button className="place-self-end" onClick={() => handleAction("create")}>Create a new
                        organization</Button>
                    <div className="overflow-x-auto bg-white rounded shadow my-2">
                        <table className="w-full whitespace-nowrap">
                            <thead>
                            <tr className="font-bold text-left">
                                <th className="px-6 pt-5 pb-4 text-left">Name</th>
                                <th className="px-6 pt-5 pb-4 text-center">Address</th>
                                <th className="px-6 pt-5 pb-4 text-center">Phone</th>
                                <th className="px-6 pt-5 pb-4 text-center">Type</th>
                                <th className="px-6 pt-5 pb-4 pr-10 text-right">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {props.organizations.data.map((organization) => {
                                return (
                                    <tr
                                        key={organization.id}
                                        className="hover:bg-gray-100 focus-within:bg-gray-100"
                                    >
                                        <td className="border-t pl-6 text-grey-700 text-left">
                                            {organization.name || ''}
                                        </td>
                                        <td className="border-t text-grey-700 text-center">
                                            {organization.meta.address || ''}
                                        </td>
                                        <td className="w-px border-t text-grey-700 text-center">
                                            {organization.meta.phone || ''}
                                        </td>
                                        <td className="w-px border-t text-grey-700 text-center">
                                            {organization.type || ''}
                                        </td>
                                        <td className="border-t">
                                            <div className="flex justify-end mr-2 py-4">
                                                <Button
                                                    onClick={() => handleAction("edit", organization.id)}>Edit</Button>
                                            </div>
                                        </td>

                                        <td className="border-t">
                                            <div className="mr-4 py-4">
                                                <Button
                                                    onClick={() => handleAction("delete", organization.id)}>Delete</Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {props.organizations.data.length === 0 && (
                                <tr>
                                    <td className="px-6 py-4 border-t" colSpan="4">
                                        No organizations found.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    {modal && <form
                        onSubmit={selectedOrganization ? () => handleSubmitEdit(selectedOrganization.id) : handleSubmit}>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl" style={{ minWidth: '30rem' }}>
                                {/*content*/}
                                <div
                                    className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div
                                        className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                            {selectedOrganization ? "Edit your organization" : "Create a new organization"}
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setModal(false)}
                                        >
                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                                        </button>
                                    </div>
                                    {/*body*/}

                                    <div className="bg-white dark:bg-gray-800 rounded px-4">
                                        <div className="mx-auto pt-4">
                                            <div className="container mx-auto">
                                                <div className="w-max flex flex-col mb-6 mx-auto">
                                                    <label htmlFor="name"
                                                           className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                                        Name
                                                    </label>
                                                    <input type="text" id="name" name="name" required
                                                           value={selectedOrganization ? selectedOrganization.name : data.name}
                                                           onChange={event => setData('name', event.target.value)}
                                                           className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
                                                           placeholder="Enter name"/>
                                                </div>
                                                <div className="w-max flex flex-col mb-6 mx-auto">
                                                    <label htmlFor="description"
                                                           className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                                        Description
                                                    </label>
                                                    <textarea type="text" id="description" name="description" required
                                                              value={selectedOrganization ? selectedOrganization.description : data.description}
                                                              onChange={e => setData('description', e.target.value)}
                                                              className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
                                                    />
                                                </div>
                                                <div className="w-max mx-auto flex flex-col mb-6">
                                                    <label htmlFor="email"
                                                           className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                                        Email
                                                    </label>
                                                    <div className="flex">
                                                        <input type="text" id="email" name="email" required
                                                               value={selectedOrganization.meta ? selectedOrganization.meta.email : data.email}
                                                               onChange={event => setData('email', event.target.value)}
                                                               className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
                                                               placeholder="example@gmail.com"/>
                                                    </div>
                                                </div>
                                                <div className="w-max mx-auto flex flex-col mb-6">
                                                    <label htmlFor="address"
                                                           className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                                        Address
                                                    </label>
                                                    <input type="text" id="address" name="address" required
                                                           value={selectedOrganization.meta ? selectedOrganization.meta.address : data.address}
                                                           onChange={event => setData('address', event.target.value)}
                                                           className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded bg-transparent text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
                                                    />
                                                </div>

                                                <div className="w-max mx-auto flex flex-col mb-6">
                                                    <label htmlFor="phone"
                                                           className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                                        Phone
                                                    </label>
                                                    <input type="text" id="phone" name="phone" required
                                                           value={selectedOrganization.meta ? selectedOrganization.meta.phone : data.phone}
                                                           onChange={event => setData('phone', event.target.value)}
                                                           className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
                                                    />
                                                </div>

                                                <div className="w-max mx-auto flex flex-col mb-6">
                                                    <label htmlFor="website"
                                                           className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                                        Website
                                                    </label>
                                                    <input type="text" id="website" name="website" required
                                                           value={selectedOrganization.meta ? selectedOrganization.meta.website : data.website}
                                                           onChange={event => setData('website', event.target.value)}
                                                           className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
                                                    />
                                                </div>
                                                <div className="w-max mx-auto flex flex-col mb-6">
                                                    <label htmlFor="type"
                                                           className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                                        Type
                                                    </label>
                                                    <select type="text" id="type" name="type" required
                                                            value={selectedOrganization ? selectedOrganization.type : data.type}
                                                            onChange={event => setData('type', event.target.value)}
                                                            className="border bg-transparent border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
                                                    >
                                                        <option value="1">Company</option>
                                                        <option value="2">Governmental Organization</option>
                                                        <option value="3">ONG</option>
                                                    </select>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setModal(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="bg-emerald-500 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded"
                                            type="submit"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"/>
                    </form>}
                    <Paginate links={props.organizations.links}/>
                </div>
            </div>


        </Authenticated>
    );
}
