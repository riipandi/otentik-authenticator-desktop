import { getInitials } from '../utils/helpers'

const vault = {
    A: [
        {
            id: 1,
            name: 'Leslie Abbott',
            userId: 'Co-Founder / CEO',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 2,
            name: 'Hector Adams',
            userId: 'VP, Marketing',
            imageUrl:
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 3,
            name: 'Blake Alexander',
            userId: 'Account Coordinator',
            imageUrl:
                'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 4,
            name: 'Fabricio Andrews',
            userId: 'Senior Art Director',
            imageUrl:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    ],
    B: [
        {
            id: 5,
            name: 'Angela Beaver',
            userId: 'Chief Strategy Officer',
            imageUrl:
                'https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 6,
            name: 'Yvette Blanchard',
            userId: 'Studio Artist',
            imageUrl:
                'https://images.unsplash.com/photo-1506980595904-70325b7fdd90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 7,
            name: 'Lawrence Brooks',
            userId: 'Content Specialist',
            imageUrl:
                'https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    ],
    C: [
        {
            id: 8,
            name: 'Jeffrey Clark',
            userId: 'Senior Art Director',
            imageUrl:
                'https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 9,
            name: 'Kathryn Cooper',
            userId: 'Associate Creative Director',
            imageUrl:
                'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    ],
    E: [
        {
            id: 10,
            name: 'Alicia Edwards',
            userId: 'Junior Copywriter',
            imageUrl:
                'https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 11,
            name: 'Benjamin Emerson',
            userId: 'Director, Print Operations',
            imageUrl:
                'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 12,
            name: 'Jillian Erics',
            userId: 'Designer',
            imageUrl:
                'https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 13,
            name: 'Chelsea Evans',
            userId: 'Human Resources Manager',
            imageUrl:
                'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    ],
    G: [
        {
            id: 14,
            name: 'Michael Gillard',
            userId: 'Co-Founder / CTO',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 15,
            name: 'Dries Giuessepe',
            userId: 'Manager, Business Relations',
            imageUrl:
                'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    ],
    M: [
        {
            id: 16,
            name: 'Jenny Harrison',
            userId: 'Studio Artist',
            imageUrl:
                'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 17,
            name: 'Lindsay Hatley',
            userId: 'Front-end Developer',
            imageUrl:
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 18,
            name: 'Anna Hill',
            userId: 'Partner, Creative',
            imageUrl:
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    ],
    S: [
        {
            id: 19,
            name: 'Courtney Samuels',
            userId: 'Designer',
            imageUrl:
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 20,
            name: 'Tom Simpson',
            userId: 'Director, Product Development',
            imageUrl:
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    ],
    T: [
        {
            id: 21,
            name: 'Floyd Thompson',
            userId: 'Principal Designer',
            imageUrl:
                'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 22,
            name: 'Leonard Timmons',
            userId: 'Senior Designer',
            imageUrl:
                'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 23,
            name: 'Whitney Trudeau',
            userId: 'Copywriter',
            imageUrl:
                'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    ],
    W: [
        {
            id: 24,
            name: 'Kristin Watson',
            userId: 'VP, Human Resources',
            imageUrl:
                'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 25,
            name: 'Emily Wilson',
            userId: 'VP, User Experience',
            imageUrl:
                'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    ],
    Y: [
        {
            id: 26,
            name: 'Emma Young',
            userId: 'Senior Front-end Developer',
            imageUrl:
                'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    ],
}

export const ItemsList = () => {
    return (
        <>
            {Object.keys(vault).map((letter) => (
                <div key={letter} className='relative'>
                    <div className='z-10 sticky top-0 border-t border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-6 py-1 text-sm font-medium text-gray-500'>
                        <h3>{letter}</h3>
                    </div>
                    <ul role='list' className='relative z-0 divide-y divide-gray-200 dark:divide-gray-700'>
                        {/* @ts-ignore */}
                        {vault[letter].map((item) => (
                            <li key={item.id} className='bg-gray-50 dark:bg-gray-900'>
                                <div className='relative px-6 py-5 flex items-center space-x-3 hover:bg-primary-50 dark:hover:bg-gray-800 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 group'>
                                    <div className='flex-shrink-0 grayscale group-hover:grayscale-0'>
                                        <span className='inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary-500'>
                                            <span className='font-medium leading-none text-white'>
                                                {getInitials(item.name)}
                                            </span>
                                        </span>
                                        {/* <img
                                            className='h-10 w-10 rounded-full'
                                            src={item.imageUrl}
                                            alt={item.name}
                                        /> */}
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                        <a href='#' className='focus:outline-none'>
                                            {/* Extend touch target to entire panel */}
                                            <span className='absolute inset-0' aria-hidden='true' />
                                            <p className='text-sm font-bold text-gray-900 dark:text-gray-200'>
                                                {item.name}
                                            </p>
                                            <p className='text-sm font-medium text-gray-500 dark:text-gray-400 truncate'>
                                                {item.userId}
                                            </p>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    )
}
