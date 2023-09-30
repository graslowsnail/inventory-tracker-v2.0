import Link from 'next/link';
const people = [
  { name: 'Sakib Zafar', currentStock: '100', boxQuantity: '50', barcodeId: '75ghut' },
  { name: 'Pablo Ramirez', currentStock: '100', boxQuantity: '25', barcodeId: '9ru0ewipo' },
]

export default function PartsList() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">Parts</h1>
                <p className="mt-2 text-md text-gray-700">
                    A list of all the parts inside the consignment.
                </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                    type="button"
                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Add Part
                </button>
            </div>
        </div>
        <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300 border-t border-l border-r border-gray-300">
                        <thead>
                            <tr className="divide-x divide-gray-200">
                                <th scope="col" className="py-3.5 pl-4 pr-4 text-center text-sm font-semibold text-gray-900">
                                   Part Name 
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-center text-sm font-semibold text-gray-900">
                                   Current Stock 
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-center text-sm font-semibold text-gray-900">
                                    Box Quantity
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0">
                                   Bar Code Id 
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {people.map((person) => (
                                <tr key={person.name} className="divide-x divide-gray-200">
                                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 text-center">{person.name}</td>
                                    <td className="whitespace-nowrap p-4 text-sm text-gray-500 text-center">{person.currentStock}</td>
                                    <td className="whitespace-nowrap p-4 text-sm text-gray-500 text-center">{person.boxQuantity}</td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">{person.barcodeId}</td>
                                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                        <Link href={`/parts/${person.barcodeId}`}>
                                                <button
                                                    type="button"
                                                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    Edit part
                                                </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
)

}

