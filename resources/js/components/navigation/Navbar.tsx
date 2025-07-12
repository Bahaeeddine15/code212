import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Link } from '@inertiajs/react';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function Example() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showCompetitionsDropdown, setShowCompetitionsDropdown] = useState(false);
    return (
        <>
        
        </>
    );
}
