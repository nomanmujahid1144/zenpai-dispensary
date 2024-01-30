import { useEffect } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'

export const FiltersSection = (props) => {


    const onCheck = (e , value , name ) => {
        props.handleClick(e , value , name )
      }   

    return (
        <>
            <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                    <div key={props.key} className="flex items-center">
                    <input
                        id={props.id}
                        name={props.name}
                        defaultValue={props.defaultValue}
                        type="checkbox"
                        onChange={(e) => { onCheck(e , props.defaultValue , props.name)}}
                        defaultChecked={props.defaultChecked}
                        className="h-4 w-4 rounded border-gray-300 text-myBg focus:ring-myBg"
                    />
                    <label
                        htmlFor={props.htmlFor}
                        className="ml-3 text-sm text-gray-600"
                    >
                        {props.label}
                    </label>
                    </div>
                </div>
            </Disclosure.Panel>
        </>
    )
} 